import { createSlice } from "@reduxjs/toolkit";
import { remoteDataDefault, remoteDataReducer, remoteDataFetcher } from "./remoteDataTools";
import pokeApi from "services/PokeApi";


const slice = createSlice({
    name: "game",
    initialState: {
        player1Deck: { ...remoteDataDefault },
        player1Start: {},
        player2Start: { ...remoteDataDefault },
        matchResults: { type: null }
    },
    reducers: {
        player1DeckFetch: remoteDataReducer("player1Deck"),
        player1StartAdd: player1StartAddReducer,
        player1StartClean: (state) => ({ ...state, player1Start: {} }),
        player2StartFetch: remoteDataReducer("player2Start"),
        matchResultsSet: (state, { payload: { type } }) => ({ ...state, matchResults: { type: type || null } })
    }
});

export const player1DeckGet = (state) => state.game.player1Deck;

export const player1DeckFetch = remoteDataFetcher(
    slice.actions.player1DeckFetch,
    async ({ pokeDb }) => {
        let res = await pokeDb.getPokemonOnce();
        if (Object.keys(res ?? {}).length === 0) {
            const userStarterPack = await pokeApi.getNewUserStarterPack();

            for (let item of userStarterPack) {
                await pokeDb.addPokemon(item);
            }
            res = await pokeDb.getPokemonOnce();
        }
        return res;
    }
);

export const player1StartGet = (state) => state.game.player1Start;
export const { player1StartAdd, player1StartClean } = slice.actions;

export const player2StartGet = (state) => state.game.player2Start;

export const player2StartFetch = remoteDataFetcher(
    slice.actions.player2StartFetch,
    async () => pokeApi.getPlayer2()
);

export const matchResultsGet = (state) => state.game.matchResults;
export const { matchResultsSet } = slice.actions;

export default slice.reducer;


function player1StartAddReducer(state, { payload: { uid, card } }) {
    const newCards = { ...state.player1Start };
    if (newCards[uid]) {
        delete newCards[uid];
        return { ...state, player1Start: newCards };
    }

    newCards[uid] = card;
    return { ...state, player1Start: newCards };
}