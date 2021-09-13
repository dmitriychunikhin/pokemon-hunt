import style from "./style.module.css";

import MenuHeader from "../../components/MenuHeader";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import PockemonCard from "../../components/PokemonCard";

import LayoutBg3 from "../../assets/bg1.jpg";

import pokemonList from "../../assets/Pokemons.json";


const HomePage = ({ onSetPage }) => {

  return (
    <>
      
      <MenuHeader onSetPage={onSetPage} />

      <Header
        title="Pokemon hunt"
        descr="The game of the year"
      />

      <Layout
        id="rules"
        title="The rules"
        urlBg={LayoutBg3}
      >
        <p><s>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</s></p>
        <p><s>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</s></p>
        <p>Click on the card until the pokemon begs you for mercy</p>
      </Layout>

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

      <Layout
        id="about"
        title="The word of encouragement"
        urlBg={LayoutBg3}
      >
        <p>To be a grinder is not a disgrace</p>
      </Layout>

      <Footer />
    </>
  );
}

export default HomePage;