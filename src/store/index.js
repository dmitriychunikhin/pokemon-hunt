import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "./game";
import userReducer from "./user";
import statusBarReducer from "./statusBar";

const store = configureStore({
    reducer: {
        game: gameReducer, 
        user: userReducer,
        statusBar: statusBarReducer,
    }
});

export default store;