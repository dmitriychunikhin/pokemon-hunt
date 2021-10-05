import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';

import PokemonCard from 'components/PokemonCard';
import PlayerBoard from "components/PlayerBoard";
import ArrowChoice from "components/ArrowChoice";
import Result from "components/Result";
import Loader from "components/Loader";

import { useHistory } from 'react-router-dom';
import pokeApi from 'services/PokeApi';
import * as gameStore from "store/game";


const BoardPage = () => {

    //Environment 
    const history = useHistory();

    //Game match conditions
    const maxTurnCount = 9;
    const startPlayerSelectionDelay = 2000;
    const finishPageRedirectDelay = 3000;
    const player1ID = "blue";
    const player2ID = "red";

    //store
    const dispatch = useDispatch();
    const player1Start = useSelector(gameStore.player1StartGet);
    const player2Start = useSelector(gameStore.player2StartGet);

    //In-match states
    const [playerOrder] = useState([player1ID, player2ID]);
    const [curPlayer, setCurPlayer] = useState(null);
    const [player1Cards, setPlayer1Cards] = useState([]);
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [boardState, setBoardState] = useState([]);
    const [cardSelected, setCardSelected] = useState({ id: "", player: "" });
    const [turnCount, setTurnCount] = useState(0);
    const [matchResults, setMatchResults] = useState({ type: null });


    //Exit condition
    if (Object.keys(player1Start).length === 0) {
        history.replace("/game");
    }


    //////////////////////////////////////////////////////////////////////
    //Game match flow
    //////////////////////////////////////////////////////////////////////
    const flowStep = useRef("init");

    //Initalization of the match
    useEffect(() => {

        if (flowStep.current === "init") {
            flowStep.current = "initPending";

            pokeApi.getBoard().then((data) => {
                setBoardState(data)
            });

            setPlayer1Cards(Object.values(player1Start).map(item => ({
                ...item,
                player: player1ID,
                possession: player1ID
            })));

            dispatch(gameStore.player2StartFetch());

            return;
        }

        if (flowStep.current !== "initPending") return;

        if (player2Start.isPending) return;

        if (!boardState?.length) return;

        if (!player2Start.data) return;

        flowStep.current = "initPlayerSelection";

        let timeoutId = setTimeout(() => {
            setCurPlayer(Math.floor(Math.random() * playerOrder.length));
            flowStep.current = "play";
        }, startPlayerSelectionDelay);

        setPlayer2Cards(player2Start.data.map(item => ({
            ...item,
            player: player2ID,
            possession: player2ID
        })));

        return () => { clearTimeout(timeoutId); }

    }, [boardState?.length, player1Start, player2Start, playerOrder, dispatch])


    //End game conditions
    useEffect(() => {

        if (flowStep.current !== "play") return;

        if (turnCount !== maxTurnCount) return;

        flowStep.current = "finish";

        let player1Possessed = player1Cards.length;
        let player2Possessed = player2Cards.length;

        boardState.forEach(item => {
            if (!item.card) return;
            if (item.card.possession === player1ID) player1Possessed++;
            if (item.card.possession === player2ID) player2Possessed++;
        });

        let resType = null;

        if (player1Possessed > player2Possessed) {
            resType = "win";
        }
        else if (player1Possessed < player2Possessed) {
            resType = "lose";
        }
        else {
            resType = "draw";
        }

        setMatchResults(prev => ({ ...prev, type: resType }));
        setCurPlayer(null);


    }, [turnCount, boardState, player1Cards, player2Cards]);


    //Finish match 
    useEffect(() => {

        if (flowStep.current !== "finish") return;
        flowStep.current = null;

        const timeoutId = setTimeout(() => {
            dispatch(gameStore.matchResultsSet(matchResults));
            history.replace("/game/finish");
        }, finishPageRedirectDelay);

        return () => { clearTimeout(timeoutId); }

    }, [matchResults, dispatch, history])
    //////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////
    // UI handlers
    //////////////////////////////////////////////////////////////////////
    const handleCardSelect = (card) => {
        if (curPlayer === null) return;
        if (card?.id && checkIsTurnProcessing()) return;

        if (card.player !== playerOrder[curPlayer]) {
            alert("It's not your turn");
            return;
        }
        setCardSelected(card);
    }

    const handleBoardClick = ({ position, card }) => {
        makeTurn({ position, card });
    }


    //////////////////////////////////////////////////////////////////////
    //Turn mechanics
    //////////////////////////////////////////////////////////////////////
    const [turnProcessingState, setTurnProcessingState] = useState(null);

    const checkIsTurnProcessing = () => (!!turnProcessingState);

    const makeTurn = async ({ position, card }) => {

        if (card?.id) return;
        if (!cardSelected?.id) return;

        if (checkIsTurnProcessing()) {
            return;
        }

        setTurnProcessingState(cardSelected.player);


        //Put the card on board in pending state for animation purposes
        setBoardState((prev) => {
            const newBS = [...prev];
            newBS[position - 1] = { ...newBS[position - 1], card: cardSelected, pending: true };
            return newBS;
        });


        //Request turn results from PokeAPI
        const params = {
            position,
            card: cardSelected,
            board: boardState
        };

        const newBS = await pokeApi.makeTurn(params);

        //Remove played card from player's assets
        if (cardSelected.player === player1ID) {
            setPlayer1Cards(prev => prev.filter((item) => item.id !== cardSelected.id));
        }

        if (cardSelected.player === player2ID) {
            setPlayer2Cards(prev => prev.filter((item) => item.id !== cardSelected.id));
        }

        //Finilize board
        setBoardState(newBS);

        //Set next step/turn 
        setTurnCount(prev => prev + 1);

        setCurPlayer(prev => (prev + 1) % (playerOrder.length || 1));
        setTurnProcessingState(null);
        setCardSelected({});
    }




    return (
        <div className={style.root}>

            {
                matchResults.type &&
                <Result type={matchResults.type} />
            }

            {
                turnCount === 0 &&
                player1Cards.length !== 0 &&
                player2Cards.length !== 0 &&
                <ArrowChoice side={curPlayer === null ? 0 : curPlayer + 1} />
            }

            <div className={style.playerOne}>
                <PlayerBoard
                    cards={player1Cards}
                    cardSelected={cardSelected.player === player1ID && cardSelected}
                    onCardSelect={handleCardSelect}
                />
            </div>
            <div className={style.board}>
                {!boardState?.length && <Loader />}

                {
                    boardState.map(({ position, card, pending }) =>
                        <div
                            key={position}
                            className={style.boardPlate}
                            onClick={() => { handleBoardClick({ position, card }) }}
                        >
                            {!card && position}

                            {card &&
                                <PokemonCard
                                    id={card.id}
                                    name={card.name}
                                    type={card.type}
                                    img={card.img}
                                    values={card.values}
                                    blinking={pending}
                                    possession={card.possession}
                                    isActive
                                    minimize
                                />
                            }
                        </div>
                    )
                }
            </div>

            <div className={style.playerTwo}>

                {player2Start.isPending && <Loader />}

                {
                    <PlayerBoard
                        cards={player2Cards}
                        cardSelected={cardSelected.player === player2ID && cardSelected}
                        onCardSelect={handleCardSelect}
                    />
                }
            </div>

        </div>

    );
};

export default BoardPage;
