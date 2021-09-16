import { useState } from "react";

import style from "./style.module.css";

import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import POKEMONS from "../../assets/Pokemons.json";


const GamePage = () => {

    const [pokemons, setPokemons] = useState(() => POKEMONS.slice(0,5));

    const handlePokemonCardClick = (id) => {
        setPokemons(pokemons.map(item => item.id === id ? {...item, active: !item.active } : item));
    }

    return (
        <>

            <Layout
                id="cards"
                colorTitle="#fafafa"
                colorBg="#252934"
                title="Start gaming now!"
            >
                <div className={style.flex}>

                    {
                        pokemons.map(item =>
                            <PokemonCard
                                key={item.id}
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
