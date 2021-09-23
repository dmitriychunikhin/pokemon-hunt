import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { GameContext } from "context/GameContext";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

const GamePage = () => {

    const [gameState, setGameState] = useState({
        player1StartCards: {},
        player2StartCards: [],
        matchResults: {}
    });


    const handleSelectPlayer1StartCard = (uid, pok) => {
        setGameState(prev => {
            const newPokes = { ...prev.player1StartCards };
            if (newPokes[uid]) {
                delete newPokes[uid];
                return { ...prev, player1StartCards: newPokes };
            }

            newPokes[uid] = pok;
            return { ...prev, player1StartCards: newPokes };
        })
    }

    const handleSetPlayer1StartCards = (player1StartCards) => {

        setGameState(prev => ({
            ...prev,
            player1StartCards: { ...player1StartCards }
        }));

    }

    const handleSetPlayer2StartCards = (player2StartCards) => {

        setGameState(prev => ({
            ...prev,
            player2StartCards: [...player2StartCards]
        }));

    }

    const handleSetMatchResults = (matchResults) => {
        setGameState(prev => ({
            ...prev,
            matchResults: { ...matchResults }
        }));
    }


    const match = useRouteMatch();

    return (
        <GameContext.Provider
            value={{
                ...gameState,
                onSelectPlayer1StartCard: handleSelectPlayer1StartCard,
                onSetPlayer1StartCards: handleSetPlayer1StartCards,
                onSetPlayer2StartCards: handleSetPlayer2StartCards,
                onSetMatchResults: handleSetMatchResults
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
