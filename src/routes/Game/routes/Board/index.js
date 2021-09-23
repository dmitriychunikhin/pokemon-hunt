import { useContext, useEffect, useState } from 'react';
import style from './style.module.css';

import PokemonCard from 'components/PokemonCard';
import PlayerBoard from "components/PlayerBoard";
import ArrowChoice from "components/ArrowChoice";
import Result from "components/Result";

import { PokeApiContext } from "context/PokeApiContext";
import { GameContext } from 'context/GameContext';
import { useHistory } from 'react-router-dom';

const BoardPage = () => {

    //Environment 
    const history = useHistory();
    const pokeApi = useContext(PokeApiContext);
    const gameState = useContext(GameContext);

    //Game match conditions
    const maxTurnCount = 9;
    const startPlayerSelectionDelay = 2000;
    const finishPageRedirectDelay = 3000;
    const player1ID = "blue";
    const player2ID = "red";

    //In-match states
    const [playerOrder] = useState([player1ID, player2ID]);
    const [curPlayer, setCurPlayer] = useState(null);
    const [player1Cards, setPlayer1Cards] = useState([]);
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [player2StartCards, setPlayer2StartCards] = useState([]);
    const [boardState, setBoardState] = useState([]);
    const [cardSelected, setCardSelected] = useState({ id: "", player: "" });
    const [turnCount, setTurnCount] = useState(0);
    const [matchResults, setMatchResults] = useState({ type: null });


    //Exit condition
    if (Object.keys(gameState.player1StartCards).length === 0) {
        history.replace("/game");
    }


    //////////////////////////////////////////////////////////////////////
    //Game match flow
    //////////////////////////////////////////////////////////////////////
    const [flowStep, setFlowStep] = useState(null);

    useEffect(() => { setFlowStep("init") }, []);

    useEffect(() => {
        //Initalization of the match

        if (flowStep === "init") {
            setFlowStep("initPending");
            initMatch().then(() => {
                setFlowStep("play");
            });
        }

        async function initMatch() {

            const bs = await pokeApi.getBoard();
            setBoardState(bs);

            setPlayer1Cards(Object.values(gameState.player1StartCards).map(item => ({
                ...item,
                player: player1ID,
                possession: player1ID
            })));

            const p2 = await pokeApi.createPlayer();

            setPlayer2Cards(p2.map(item => ({
                ...item,
                player: player2ID,
                possession: player2ID
            })));

            setPlayer2StartCards(p2);

            return new Promise((resolve) => {
                setTimeout(() => {
                    setCurPlayer(Math.floor(Math.random() * playerOrder.length))
                    resolve && resolve();
                }, startPlayerSelectionDelay)
            });

        }
    }, [flowStep, pokeApi, playerOrder, gameState]);


    useEffect(() => {
        //End game conditions
        if (turnCount !== maxTurnCount) return;
        setFlowStep("results");
    }, [turnCount]);


    useEffect(() => {
        if (flowStep === "results") {
            setFlowStep("resultsPending");
            showResults();
            setFlowStep("finish");
        }

        function showResults() {

            let player1Possessed = 0;
            let player2Possessed = 0;

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

        }

    }, [flowStep, boardState]);


    useEffect(() => {
        if (flowStep !== "finish") return;
        setFlowStep(null);
        gameState.onSetMatchResults(matchResults);
        gameState.onSetPlayer2StartCards(player2StartCards);
        setTimeout(() => { history.replace("/game/finish") }, finishPageRedirectDelay);
    }, [flowStep, gameState, matchResults, player2StartCards, history]);
    //////////////////////////////////////////////////////////////////////




    const handleCardSelect = (card) => {
        if (curPlayer === null) return;
        if (card && card.id && checkIsTurnProcessing()) return;

        if (card.player !== playerOrder[curPlayer]) {
            alert("It's not your turn");
            return;
        }
        setCardSelected(card);
    }

    const handleBoardClick = ({ position, card }) => {

        if ((card || {}).id) return;
        if (!(cardSelected || {}).id) return;

        if (checkIsTurnProcessing()) {
            return;
        }

        setTurnProcessingState(cardSelected.player);

        makeTurn({ position, card });
    }


    //Turn mechanics
    const [turnProcessingState, setTurnProcessingState] = useState(null);

    const makeTurn = async ({ position, card }) => {

        const params = {
            position,
            card: cardSelected,
            board: boardState
        };

        const newBS = await pokeApi.makeTurn(params);

        if (cardSelected.player === player1ID) {
            setPlayer1Cards(prev => prev.filter((item) => item.id !== cardSelected.id));
        }

        if (cardSelected.player === player2ID) {
            setPlayer2Cards(prev => prev.filter((item) => item.id !== cardSelected.id));
        }


        setBoardState(newBS);

        setTurnCount(prev => prev + 1);

        setCurPlayer(prev => (prev + 1) % (playerOrder.length || 1));
        setTurnProcessingState(null);
        setCardSelected({});
    }


    const checkIsTurnProcessing = () => {
        if (!turnProcessingState) return false;

        alert(`Player "${turnProcessingState}" turn is processing...`);
        return true;
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
                {
                    boardState.map(({ position, card }) =>
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
                                    className={style.card}
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
                <PlayerBoard
                    cards={player2Cards}
                    cardSelected={cardSelected.player === player2ID && cardSelected}
                    onCardSelect={handleCardSelect}
                />
            </div>

        </div>

    );
};

export default BoardPage;
