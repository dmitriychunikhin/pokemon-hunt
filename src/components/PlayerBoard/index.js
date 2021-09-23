import PokemonCard from "components/PokemonCard";
import s from "./style.module.css";
import cn from "classnames";

const PlayerBoard = ({ cards, cardSelected, onCardSelect }) => {

    const handleClick = (card) => {
        onCardSelect && onCardSelect(card);
    }

    return (
        <>
            {
                cards.map((item, index) =>
                    <PokemonCard
                        key={index}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        img={item.img}
                        values={item.values}
                        onClick={() => { handleClick(item) }}
                        className={cn(s.card, { [s.selected]: cardSelected.id === item.id })}
                        isActive
                        minimize
                    />
                )
            }

        </>

    );
};

export default PlayerBoard;
