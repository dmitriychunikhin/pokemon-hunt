import { useEffect } from "react";
import { Switch, Route, Redirect, useLocation, } from "react-router-dom";

import { PokeDbContext } from "context/PokeDb";
import PokeDb from "services/PokeDb";

import { useDispatch, useSelector } from "react-redux";
import * as userStore from "store/user";

import 'react-notifications/lib/notifications.css';
import style from "./App.module.css";
import cn from "classnames";

import PrivateRoute from "components/PrivateRoute";
import MenuHeader from "components/MenuHeader";
import Footer from "components/Footer";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import UserPage from "./routes/User";
import NotFoundPage from "./routes/NotFound";

import { NotificationContainer } from "react-notifications";


const App = () => {


  const location = useLocation();
  const isBgActive = (location.pathname === "/" || location.pathname === "/game/board");

  const dispatch = useDispatch();
  const user = useSelector(userStore.selectUser);

  useEffect(() => {
    if (user.isPending) return;
    if (user.isFullfilled) return;

    dispatch(userStore.userFetch());

  }, [user, dispatch])

  if (user.isPending) {
    return "Loading...";
  }


  return (
    <PokeDbContext.Provider value={new PokeDb({ userLocalId: user.data?.localId, userIdToken: userStore.getUserSessionToken() })}>
      <Switch>
        <Route path="/notfound" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isBgActive} />

            <div className={cn(style.wrap, { [style.isHomePage]: isBgActive })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/user" component={UserPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (<Redirect to="/notfound" />)} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </PokeDbContext.Provider>

  );

}

export default App;