
class PokeApi {

  getBoard = async () => {
    const res = await (await fetch("https://reactmarathon-api.netlify.app/api/board")).json();
    return res.data;
  }

  createPlayer = async () => {
    const res = await (await fetch("https://reactmarathon-api.netlify.app/api/create-player")).json();
    return res.data;
  }

  makeTurn = async ({position, card, board}) => {
    
    const params = {
      position,
      card,
      board
    };

    const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const request = await res.json();
    return request.data;
  }

}


const pokeApi = new PokeApi();
export default pokeApi;

