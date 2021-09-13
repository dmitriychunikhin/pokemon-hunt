import style from "./style.module.css";

const GamePage = ({ onSetPage }) => {

    return (
        <section className={style.root}>
            <div className={style.container}>
                <h1>It's the game page</h1>
                <button onClick={() => { onSetPage("home") }}>Go home</button>
            </div>
        </section>
    );
}

export default GamePage;
