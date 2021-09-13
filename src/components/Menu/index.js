import cn from "classnames";
import style from "./style.module.css";
const Menu = ({ isActive }) => {

    return (
        <div className={cn(style.menuContainer, {[style.active]: isActive===true, [style.deactive]: isActive===false})}>
            <div className={style.overlay} />
            <div className={style.menuItems}>
                <ul>
                    <li>
                        <a href="#welcome">
                            HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game">
                            GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;