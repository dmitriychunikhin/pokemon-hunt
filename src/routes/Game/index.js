import { useEffect, useState } from "react";

import style from "./style.module.css";

import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import db from "../../services/firebase";

import POKEMONS_DEFAULT_DB from "../../assets/pokemons-default-db.json";

const dbPokemonsPath = "pokemons";

const GamePage = () => {

    const [pokemons, setPokemons] = useState({});    
    const [desk, setDesk] = useState({ pokemonCount: 0 });

    const loadPokemons = () => {
        db.ref("pokemons").once("value",
            (snapshot) => {
                const data = snapshot.val();
                setDesk(prev => ({ ...prev, pokemonCount: Object.keys(data || {}).length }));
                setPokemons(data || {});
            },
            (err) => { console.error(err) });
    }


    const handlePokemonCardClick = (id) => {

        setPokemons(prev => Object.entries(prev).reduce((acc, [k, pokemon]) => {

            if (pokemon.id === id && !pokemon.active) {
                pokemon.active = true;

                db.ref(`${dbPokemonsPath}/${k}`).set(pokemon, (err) => {
                    err && console.error(err);
                });
            }

            acc[k] = pokemon;
            return acc;
        }, {}));

    }


    const handleAddPokemon = () => {

        if (!POKEMONS_DEFAULT_DB) return;
        const pokemonSpecies = Object.values(POKEMONS_DEFAULT_DB.pokemons || {});
        if (pokemonSpecies.length === 0) return;
        const pokemon = pokemonSpecies[Math.floor(Math.random() * pokemonSpecies.length)];

        const key = db.ref().child(dbPokemonsPath).push().key;

        db.ref(`${dbPokemonsPath}/${key}`).set(pokemon, (err) => {
            err && console.error(err);
            !err && loadPokemons()
        });

    }


    const handleResetDesk = () => {

        db.ref("/").set(POKEMONS_DEFAULT_DB, (err) => {
            err && console.error(err);
            !err && loadPokemons()
        });
    }


    useEffect(loadPokemons, []);

    return (
        <>
            <Layout
                id="cards"
                colorTitle="#fafafa"
                colorBg="#252934"
                title="Start gaming now!"
            >
                <div className={style.toolbar}>
                    <div className={style.wrap}><h1>Cards on desk: {desk.pokemonCount}</h1></div>
                    <div className={style.wrap}>
                        <button onClick={handleAddPokemon}>Add new pokemon</button>
                    </div>
                    <div className={style.wrap}>
                        <button onClick={handleResetDesk}>Reset desk</button>
                    </div>
                </div>

                <div className={style.flex}>

                    {
                        Object.entries(pokemons).map(([key, item]) =>
                            <PokemonCard
                                key={key}
                                id={item.id}
                                name={item.name}
                                type={item.type}
                                img={item.img}
                                values={item.values}
                                isActive={item.active}
                                onClick={handlePokemonCardClick}
                            />
                        )
                    }

                </div>
            </Layout>

        </>
    );
}

export default GamePage;
