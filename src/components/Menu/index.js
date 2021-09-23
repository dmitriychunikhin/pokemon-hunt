import { Link } from "react-router-dom";
import style from "./style.module.css";
import cn from "classnames";

const MENU = [
    {
        title: "HOME",
        to: "/"
    },
    {
        title: "GAME",
        to: "/game"
    },
    {
        title: "ABOUT",
        to: "/about"
    },
    {
        title: "CONTACT",
        to: "/contact"
    }
];


const Menu = ({ isOpen, onItemSelect }) => {

    return (
        <div className={cn(style.menuContainer, { [style.active]: isOpen === true, [style.deactive]: isOpen === false })}>
            <div className={style.overlay} />
            <div className={style.menuItems}>
                <ul>
                    {
                        MENU.map(({ title, to }, index) => (
                            <li key={index}>
                                <Link to={to} onClick={onItemSelect}>
                                    {title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Menu;