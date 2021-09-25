import { useEffect, useState, useContext, useRef } from "react";

import { useHistory } from "react-router-dom";

import style from "./style.module.css";

import Layout from "components/Layout";
import PokemonCard from "components/PokemonCard";

import { PokeDbContext } from "context/PokeDbContext"
import { GameContext } from "context/GameContext"


const StartPage = () => {

    const pokeDb = useContext(PokeDbContext);
    const gameState = useContext(GameContext);

    const nReadyToStart = 5;
    const isReadyToStart = (Object.keys(gameState.player1StartCards).length >= nReadyToStart);

    const routeHistory = useHistory();

    const initState = useRef(true);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        if (initState.current !== true) return;
        initState.current = false;
        loadPokemons();

        async function loadPokemons() {
            gameState.onSetPlayer1StartCards({});
            const data = await pokeDb.getPokemonOnce();
            setPokemons(data || {});
        }


    }, [initState, pokeDb, gameState]);


    const handlePokemonCardClick = (uid) => {

        if (!pokemons[uid].selected && isReadyToStart) return;

        gameState.onSelectPlayer1StartCard(uid, pokemons[uid]);

        setPokemons(prev => {
            const pok = { ...(prev[uid]) };
            if (!pok) return prev;

            return {
                ...prev,
                [uid]: { ...pok, selected: !pok.selected }
            };
        });


    }

    const handleStartGame = () => {
        routeHistory.push(`/game/board`);
    }



    return (
        <>
            <Layout
                id="cards"
                colorTitle="#fafafa"
                colorBg="#252934"
                title="Start gaming now!"
            >
                <div className={style.toolbar}>
                    {isReadyToStart && (
                        <div className={style.wrap}>
                            <button onClick={handleStartGame}>Start Game</button>
                        </div>
                    )}
                    {!isReadyToStart && (
                        <div className={style.wrap}>
                            <h1>Select {nReadyToStart} pokemons to start game</h1>
                        </div>
                    )}
                </div>

                <div className={style.flex}>
                    {
                        Object.entries(pokemons).map(([uid, item]) =>
                            <div className={style.pokemonCard} key={uid}>
                                <PokemonCard
                                    id={item.id}
                                    name={item.name}
                                    type={item.type}
                                    img={item.img}
                                    values={item.values}
                                    isActive={true}
                                    isSelected={item.selected}
                                    onClick={() => handlePokemonCardClick(uid)}
                                />
                            </div>
                        )
                    }

                </div>
            </Layout>

        </>
    );
}

export default StartPage;
