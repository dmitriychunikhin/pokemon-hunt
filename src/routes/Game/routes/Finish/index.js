import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import cn from "classnames";
import s from "./style.module.css";
import PokemonCard from 'components/PokemonCard';

import * as gameStore from "store/game";
import pokeDb from 'services/PokeDb';

const FinishPage = () => {
    const history = useHistory();
    const matchResults = useSelector(gameStore.matchResultsGet);
    const player1Start = useSelector(gameStore.player1StartGet);
    const player2Start = useSelector(gameStore.player2StartGet);
    const isVictory = matchResults.type === "win";
    const isLoss = matchResults.type === "lose";
    const isDraw = matchResults.type === "draw";

    //Exit condition
    if (!matchResults?.type) {
        history.replace("/game");
    }

    const [cardSelected, setCardSelected] = useState(null);

    const handleCardClick = (card) => {
        if (!isVictory) return; 
        setCardSelected(card);
    }

    const handleEndGameClick = () => {
        if (!isVictory) {
            history.replace("/game");
            return;
        }

        if (!cardSelected) return;

        pokeDb.addPokemon(cardSelected);
        history.replace("/game");

    }


    return (
        <div className={cn(s.root, { [s.victory]: isVictory })}>
            <div className={s.header}>
                {
                    isVictory &&
                    (
                        <>
                            <h1>You've won the game. </h1>
                            <h1>Select one card of your rival as the reward, then press End game</h1>
                        </>
                    )
                }
                {
                    isLoss &&
                    (
                        <>
                            <h1>You lost.</h1>
                            <h1>Please, press End game and go cry alone</h1>
                        </>
                    )
                }
                {
                    isDraw &&
                    (
                        <>
                            <h1>It's a draw.</h1>
                            <h1>Please, press End game to replay the match</h1>
                        </>
                    )
                }

            </div>
            <div className={s.cardDeck} >
                {
                    Object.values(player1Start ?? {}).map((item, index) =>
                        <PokemonCard
                            key={index}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            img={item.img}
                            possession="blue"
                            className={cn(s.card, s["card--blue"])}
                            isActive
                            minimize
                        />
                    )
                }
            </div>

            <div className={s.betweenDecks}>
                <button
                    disabled={isVictory && !cardSelected}
                    onClick={handleEndGameClick}
                >
                    End game
                </button>
            </div>

            <div className={s.cardDeck} >
                {
                    (player2Start.data || []).map((item, index) =>
                        <PokemonCard
                            onClick={() => { handleCardClick(item) }}
                            key={index}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            img={item.img}
                            values={item.values}
                            possession="red"
                            className={cn(
                                s.card,
                                s["card--red"],
                                {
                                    [s.selected]: item.id === (cardSelected || {}).id
                                }
                            )}
                            isActive
                            minimize
                        />
                    )
                }
            </div>

        </div>
    );
};

export default FinishPage;
