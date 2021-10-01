import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector} from "react-redux";

import { selectIsLoggedIn, setAuthIdToken } from "store/app";


import Menu from "components/Menu";
import NavBar from "components/NavBar";
import Modal from "components/Modal";

import LoginForm from "components/LoginForm";



import { firebaseConfig } from "services/PokeDb";
const apiKey = firebaseConfig.apiKey;


const MenuHeader = ({ bgActive, statusMsg }) => {

    const [isMenuActive, setMenuActive] = useState(null);
    
    const [isLoginActive, setLoginActive] = useState(false);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    
    const handleMenuItemSelect = () => {
        setMenuActive(false);
    }

    const handleHamburgerClick = () => {
        setMenuActive(prev => !prev);
    }

    const handleLoginClick = () => {
        setLoginActive(true);
    }


    const handleSubmit = async ({ email, password, isSignUp }) => {

        const login = (idToken) => {
            setLoginActive(false);
            dispatch(setAuthIdToken({idToken}));
            NotificationManager.success("Successful login", 'Auth');
        }

        if (isSignUp) {
            const resSignUp = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                }),
            })).json();

            if (resSignUp.error) {
                if (resSignUp?.error?.message) { NotificationManager.error(resSignUp.error.message, 'Auth'); }
            } else {
                login(resSignUp.idToken);
            }

        } else {

            const resSignIn = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                }),
            })).json();

            if (resSignIn.error) {
                if (resSignIn?.error?.message) { NotificationManager.error(resSignIn.error.message, 'Auth'); }
            } else {
                login(resSignIn.idToken);
            }

        }
    }

    return (
        <>
            <Menu
                onItemSelect={handleMenuItemSelect}
                isOpen={isMenuActive}
            />

            <NavBar
                onHamburgerClick={handleHamburgerClick}
                onLoginClick={handleLoginClick}
                isLoggedIn={isLoggedIn}
                isActive={isMenuActive}
                bgActive={bgActive}
                statusMsg={statusMsg}
            />

            <Modal title="Enter your credentials" isOpen={isLoginActive} onClose={() => { setLoginActive(false) }}>
                <LoginForm onSubmit={handleSubmit} isReset={!isLoginActive || isLoggedIn} />
            </Modal>
        </>
    );
}

export default MenuHeader;
