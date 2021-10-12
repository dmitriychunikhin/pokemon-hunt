import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useLocation } from "react-router-dom";

import * as userStore from "store/user";

import Menu from "components/Menu";
import NavBar from "components/NavBar";
import Modal from "components/Modal";

import LoginForm from "components/LoginForm";


const MenuHeader = ({ bgActive }) => {

    const dispatch = useDispatch();

    const location = useLocation();

    const [isMenuActive, setMenuActive] = useState(null);
    const [isLoginActive, setLoginActive] = useState();

    const handleMenuItemSelect = () => {
        setMenuActive(false);
    }

    const handleHamburgerClick = () => {
        setMenuActive(prev => !prev);
    }

    const handleLoginClick = () => {
        setLoginActive(true);
    }

    const handleLoginSubmit = async ({ email, password, isSignUp }) => {
        const res = await dispatch(userStore.signUpInFetch({ props: { email, password, isSignUp } }));

        if (res.error) {
            NotificationManager.error(res.error, 'Auth');
        }
        else if (res.data) {

            setLoginActive(false);
            NotificationManager.success("Successful login", 'Auth');

            dispatch(userStore.userFetch({ init: false }));

        }

    }

    useEffect(()=>{
        if (location.pathname === "/login") {
            setLoginActive(true);
        }
    },[location.pathname])

    return (
        <>
            <Menu
                onItemSelect={handleMenuItemSelect}
                isOpen={isMenuActive}
            />

            <NavBar
                onHamburgerClick={handleHamburgerClick}
                onLoginClick={handleLoginClick}
                isActive={isMenuActive}
                bgActive={bgActive}
            />

            <Modal title="Enter your credentials" isOpen={isLoginActive} onClose={() => { setLoginActive(false) }}>
                <LoginForm onSubmit={handleLoginSubmit} isReset={!isLoginActive} />
            </Modal>
        </>
    );
}

export default MenuHeader;