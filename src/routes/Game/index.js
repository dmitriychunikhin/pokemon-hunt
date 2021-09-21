import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { GameContext } from "../../context/GameContext";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

const GamePage = () => {

    const [gameState, setGameState] = useState({ pokemons: {} });

    const match = useRouteMatch();

    const handleSelectPokemon = (uid, pok) => {
        setGameState(prev => {
            const newPoke = { ...prev.pokemons };
            if (newPoke[uid]) {
                delete newPoke[uid];
                return { ...prev, pokemons: newPoke };
            }

            newPoke[uid] = pok;
            return { ...prev, pokemons: newPoke };
        })
    }


    return (
        <GameContext.Provider
            value={{
                ...gameState,
                onSelectPokemon: handleSelectPokemon
            }}
        >
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </GameContext.Provider >
    );
}

export default GamePage;
