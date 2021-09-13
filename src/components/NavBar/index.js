import cn from "classnames";
import style from "./style.module.css";

const NavBar = ({isActive, onClickButton}) => {

    return (
        <nav className={style.root}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <div 
                    className={cn(style.menuButton, { [style.active]: isActive })}
                    onClick={onClickButton}
                >
                    <span />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
