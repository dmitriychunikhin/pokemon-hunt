
import {fetchJSON} from "./fetchTools"

class PokeApi {

  getBoard = async () => {
    const res = await fetchJSON("https://reactmarathon-api.herokuapp.com/api/pokemons/board");
    return res.data;
  }

  getNewUserStarterPack = async () => {
    const res = await fetchJSON("https://reactmarathon-api.herokuapp.com/api/pokemons/starter");
    return res.data;
  }

  getPlayer2 = async ({ player1Start }) => {
    const res = await fetchJSON("https://reactmarathon-api.herokuapp.com/api/pokemons/game/start", {
      method: "POST",
      body: JSON.stringify({
        pokemons: player1Start
      })
    });
    return res.data;
  }

  makeTurn = async ({ currentPlayer, move: { card, position }, hands: { player1Cards, player2Cards }, board }) => {

    const params = {
      currentPlayer: `p${currentPlayer}`,
      hands: {
        p1: player1Cards,
        p2: player2Cards
      },
      move: currentPlayer === 2 ? null : {
        poke: card,
        position: position
      },
      board
    }

    const res = await fetchJSON('https://reactmarathon-api.herokuapp.com/api/pokemons/game', {
      method: 'POST',
      body: JSON.stringify(params)
    });

    return res;
  }

}


const pokeApi = new PokeApi();
export default pokeApi;

