import cn from "classnames";
import style from "./style.module.css";

const NavBar = ({isActive, bgActive, onHamburgerClick, statusMsg}) => {

    return (
        <nav className={cn(style.root, {[style.bgActive]: bgActive})}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <div className={style.statusMsg}>{statusMsg}</div>
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
