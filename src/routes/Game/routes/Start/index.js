import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import style from "./style.module.css";

import Layout from "components/Layout";
import PokemonCard from "components/PokemonCard";
import Loader from "components/Loader";

import * as gameStore from "store/game";

const StartPage = () => {

    const dispatch = useDispatch();
    const player1Deck = useSelector(gameStore.player1DeckGet);
    const player1Start = useSelector(gameStore.player1StartGet);

    const nReadyToStart = 5;
    const isReadyToStart = (Object.keys(player1Start || {}).length >= nReadyToStart);

    const routeHistory = useHistory();

    const [pokemons, setPokemons] = useState({});

    const initState = useRef("init");

    useEffect(() => {

        if (initState.current === "init") {
            initState.current = "initPending";

            dispatch(gameStore.player1StartClean());
            dispatch(gameStore.player1DeckFetch());

            return;
        }

        if (initState.current !== "initPending") return;

        if (player1Deck.loading === "pending") return;

        initState.current = "initResolved";

        if (!player1Deck.data) return;
        setPokemons(player1Deck.data);

    }, [player1Deck, dispatch])




    const handlePokemonCardClick = (uid) => {

        if (!pokemons[uid]?.selected && isReadyToStart) return;

        dispatch(gameStore.player1StartAdd({ uid, card: pokemons[uid] }));

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

                    {player1Deck.loading === "pending" && <Loader />}

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
