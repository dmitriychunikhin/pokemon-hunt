
class PokeApi {

  getBoard = async () => {
    const res = await (await fetch("https://reactmarathon-api.herokuapp.com/api/pokemons/board")).json();
    return res.data;
  }

  getNewUserStarterPack = async () => {
    const res = await (await fetch("https://reactmarathon-api.herokuapp.com/api/pokemons/starter")).json();
    return res.data;
  }

  getPlayer2 = async ({ player1Start }) => {
    const res = await (await fetch("https://reactmarathon-api.herokuapp.com/api/pokemons/game/start", {
      method: "POST",
      body: JSON.stringify({
        pokemons: player1Start
      })
    })).json();
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

    const res = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/game', {
      method: 'POST',
      body: JSON.stringify(params)
    });

    const request = await res.json();
    return request;
  }

}


const pokeApi = new PokeApi();
export default pokeApi;

