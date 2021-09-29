import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "./game";
import appReducer from "./app";

const store = configureStore({
    reducer: {
        app: appReducer,
        game: gameReducer 
    }
});

export default store;