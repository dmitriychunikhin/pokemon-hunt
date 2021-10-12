import { useHistory } from "react-router-dom";
import style from "./style.module.css";


const Header = ({ title, descr }) => {

    const history = useHistory();

    return (
        <header className={style.root}>
            <div className={style.forest}></div>
            <div className={style.silhouette}></div>
            <div className={style.moon}></div>
            <div className={style.container}>
                {title && (<h1>{title}</h1>)}
                {descr && (<p>{descr}</p>)}
                <button onClick={()=>{history.push("/game")}}>Start Game</button>
            </div>
        </header>
    );
}

export default Header;