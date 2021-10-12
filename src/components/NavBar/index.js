import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import style from "./style.module.css";
import { ReactComponent as LoginSVG } from "assets/Login.svg";
import { ReactComponent as UserSVG } from "assets/User.svg";
import logo from "assets/logo.png";

import * as userStore from "store/user";
import * as statusBar from "store/statusBar";

const NavBar = ({ isActive, bgActive, onLoginClick, onHamburgerClick }) => {

    const user = useSelector(userStore.selectUser);
    const isUserLoggedIn = useSelector(userStore.selectIsLoggedIn);
    const statusMsg = useSelector((state) => statusBar.selectStatusMsgText(state));

    return (
        <nav className={cn(style.root, { [style.bgActive]: bgActive })}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </p>

                <div className={style.statusMsg}>{statusMsg}</div>


                <div className={style.loginAndHamburger}>

                    <div className={style.loginButton}>
                        {!isUserLoggedIn && !user.isPending && <LoginSVG onClick={onLoginClick} />}
                        {isUserLoggedIn && <Link to="/user"><UserSVG /></Link>}
                    </div>

                    <div
                        className={cn(style.menuButton, { [style.active]: isActive })}
                        onClick={onHamburgerClick}
                    >
                        <span />
                    </div>
                </div>

            </div>
        </nav >
    );
}

export default NavBar;
