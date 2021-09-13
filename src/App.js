import {useState} from "react";

import "./App.css";

import HomePage from "./routes/Home";
import GamePage from "./routes/Game";


const App = () => {

  const [page, setPage] = useState("");

  const handleSetPage = (page) => {
    setPage(page);
  }

  switch (page)
  {
    case "home":
      return <HomePage onSetPage={handleSetPage}/>

    case "game":
      return <GamePage onSetPage={handleSetPage}/>;

    default: 
      return <HomePage onSetPage={handleSetPage}/>
  }
  
}

export default App;