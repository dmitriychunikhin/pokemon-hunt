import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";

import Menu from "components/Menu";
import NavBar from "components/NavBar";
import Modal from "components/Modal";

import LoginForm from "components/LoginForm";


import { firebaseConfig } from "services/PokeDb";
const apiKey = firebaseConfig.apiKey;


const MenuHeader = ({ bgActive, statusMsg }) => {

    const [isOpen, setOpen] = useState(null);

    const handleMenuItemSelect = () => {
        setOpen(false);
    }

    const handleHamburgerClick = () => {
        setOpen(!isOpen);
    }

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoginForm(true);
    }



    const handleSubmit = async ({ email, password, isSignUp }) => {

        const login = (idToken) => {
            localStorage.setItem("idToken", idToken);
            setIsLoginForm(false);
            setIsLoggedIn(true);
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

    useEffect(() => {
        localStorage.removeItem("idToken");
    }, [])


    return (
        <>
            <Menu
                onItemSelect={handleMenuItemSelect}
                isOpen={isOpen}
            />

            <NavBar
                onHamburgerClick={handleHamburgerClick}
                onLoginClick={handleLoginClick}
                isLoggedIn={isLoggedIn}
                isActive={isOpen}
                bgActive={bgActive}
                statusMsg={statusMsg}
            />

            <Modal title="Enter your credentials" isOpen={isLoginForm} onClose={() => { setIsLoginForm(false) }}>
                <LoginForm onSubmit={handleSubmit} isReset={!isLoginForm || isLoggedIn} />
            </Modal>
        </>
    );
}

export default MenuHeader;
