import cn from "classnames";
import style from "./style.module.css";

const NavBar = ({isActive, bgActive, onHamburgerClick}) => {

    return (
        <nav className={cn(style.root, {[style.bgActive]: bgActive})}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <div 
                    className={cn(style.menuButton, { [style.active]: isActive })}
                    onClick={onHamburgerClick}
                >
                    <span />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
