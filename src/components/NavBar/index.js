import cn from "classnames";
import style from "./style.module.css";
import { ReactComponent as LoginSVG } from "assets/Login.svg";

const NavBar = ({ isActive, bgActive, onLoginClick, onHamburgerClick, statusMsg }) => {

    return (
        <nav className={cn(style.root, { [style.bgActive]: bgActive })}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <div className={style.statusMsg}>{statusMsg}</div>

                <div className={style.loginAndHamburger}>
                    
                    <LoginSVG className={style.loginButton} onClick={onLoginClick} />

                    <div
                        className={cn(style.menuButton, { [style.active]: isActive })}
                        onClick={onHamburgerClick}
                    >
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
