import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./App.module.css";
import cn from "classnames";

import MenuHeader from "components/MenuHeader";
import Footer from "components/Footer";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFoundPage from "./routes/NotFound";

import PrivateRoute from "components/PrivateRoute";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";

import * as appStore from "store/app";

const App = () => {

  const navBarStatusMsgText = useSelector((state) => appStore.selectNavBarStatusMsgText(state));

  const location = useLocation();
  const isBgActive = (location.pathname === "/" || location.pathname === "/game/board");


  return (
    <>
      <Switch>
        <Route path="/notfound" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isBgActive} statusMsg={navBarStatusMsgText} />

            <div className={cn(style.wrap, { [style.isHomePage]: isBgActive })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (<Redirect to="/notfound" />)} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>

  );

}

export default App;