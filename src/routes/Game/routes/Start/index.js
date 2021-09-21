import { useEffect, useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import style from "./style.module.css";

import Layout from "../../../../components/Layout";
import PokemonCard from "../../../../components/PokemonCard";

import { PokeDbContext } from "../../../../context/PokeDbContext"
import { GameContext } from "../../../../context/GameContext"


const StartPage = () => {

    const pokeDb = useContext(PokeDbContext);
    const gameState = useContext(GameContext);

    const isPokeSelected = (Object.keys(gameState.pokemons).length !== 0);

    const routeHistory = useHistory();

    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        pokeDb.getPokemonSocket((data) => {
            setPokemons(Object.entries(data || {}).reduce((acc, [uid, pok]) => {

                acc[uid] = {...pok, selected: gameState.pokemons[uid] && true};
                return acc;

            }, {}));
        });

        return () => { pokeDb.offPokemonSocket() };
    }, []);


    const handlePokemonCardClick = (uid) => {

        if (Object.keys(gameState.pokemons).length >= 5) return;

        gameState.onSelectPokemon(uid, pokemons[uid]);

        setPokemons(prev => {
            const pok = { ...(prev[uid]) };
            if (!pok) return prev;
            //if (gameState.pokemons[uid]) retu

            pok.selected = !pok.selected;

            return {
                ...prev,
                [uid]: pok
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
                    {isPokeSelected && (
                        <div className={style.wrap}>
                            <button onClick={handleStartGame} disabled={!isPokeSelected}>Start Game</button>
                        </div>
                    )}
                    {!isPokeSelected && (
                        <div className={style.wrap}>
                            <h1>Select one or more pokemons to start game</h1>
                        </div>
                    )}
                </div>

                <div className={style.flex}>
                    {
                        Object.entries(pokemons).map(([uid, item]) =>
                            <div className={style.pokemonCard} key={uid}>
                                <PokemonCard
                                    uid={uid}
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
