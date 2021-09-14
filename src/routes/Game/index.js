import style from "./style.module.css";

import MenuHeader from "../../components/MenuHeader";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import PockemonCard from "../../components/PokemonCard";

import pokemonList from "../../assets/Pokemons.json";


const GamePage = ({ onSetPage }) => {

    return (
        <>
            <MenuHeader onSetPage={onSetPage} />

            <Layout
                id="cards"
                colorTitle="#fafafa"
                colorBg="#252934"
                title="Start gaming now!"
            >
                <div className={style.flex}>

                    {
                        pokemonList.map(item =>
                            <PockemonCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                type={item.type}
                                img={item.img}
                                values={item.values}
                            />
                        )
                    }

                </div>
            </Layout>

            <Footer />

        </>
    );
}

export default GamePage;
