import { useContext } from 'react';
import style from './style.module.css';

import PokemonCard from "../../../../components/PokemonCard";
import { GameContext } from '../../../../context/GameContext';

const BoardPage = () => {
    const gameState = useContext(GameContext);

    return (
        <div className={style.root}>
            <div className={style.playerOne}>
                {
                    Object.entries(gameState.pokemons).map(([uid, item]) =>
                        <PokemonCard
                            key={uid}
                            uid={uid}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            img={item.img}
                            values={item.values}
                            isActive={true}
                            className={style.card}
                            minimize={true}
                        />
                    )
                }

            </div>
            <div className={style.board}>
                <div className={style.boardPlate}>1</div>
                <div className={style.boardPlate}>2</div>
                <div className={style.boardPlate}>3</div>
                <div className={style.boardPlate}>4</div>
                <div className={style.boardPlate}>5</div>
                <div className={style.boardPlate}>6</div>
                <div className={style.boardPlate}>7</div>
                <div className={style.boardPlate}>8</div>
                <div className={style.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;
