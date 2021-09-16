import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import style from "./App.module.css";
import cn from "classnames";

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFoundPage from "./routes/NotFound";


const App = () => {

  const isHomePage = useRouteMatch("/").isExact;

  return (
    <Switch>
      <Route path="/notfound" component={NotFoundPage} />
      <Route>
        <>
          <MenuHeader bgActive={!isHomePage} />

          <div className={cn(style.wrap, { [style.isHomePage]: isHomePage })}>
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

  );

}

export default App;