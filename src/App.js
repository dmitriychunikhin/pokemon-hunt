import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import style from "./App.module.css";
import cn from "classnames";

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFoundPage from "./routes/NotFound";

import PokeDb from "./services/PokeDb"
import { PokeDbContext } from "./context/PokeDbContext"


const App = () => {

  const pokeDb = new PokeDb();

  const location = useLocation();
  const isBgActive = (location.pathname==="/" || location.pathname === "/game/board");


  return (
    <PokeDbContext.Provider value={pokeDb}>
      <Switch>
        <Route path="/notfound" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isBgActive} />

            <div className={cn(style.wrap, { [style.isHomePage]: isBgActive })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (<Redirect to="/notfound" />)} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
    </PokeDbContext.Provider>

  );

}

export default App;