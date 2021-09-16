import Header from "../../components/Header";
import Layout from "../../components/Layout";
import LayoutBg1 from "../../assets/bg1.jpg";

const HomePage = () => {

  return (
    <>
      <Header
        title="Pokemon hunt"
        descr="The game of the year"
      />

      <Layout
        id="rules"
        title="The rules"
        urlBg={LayoutBg1}
      >
        <p><s>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</s></p>
        <p><s>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</s></p>
        <p>Click on the card until the pokemon begs you for mercy</p>
      </Layout>


      <Layout
        id="about"
        title="The word of encouragement"
        urlBg={LayoutBg1}
      >
        <p>To be a grinder is not a disgrace</p>
      </Layout>

    </>
  );
}

export default HomePage;