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

    const [isLogin, setIsLogin] = useState(false);

    const handleLoginClick = () => {
        setIsLogin(true);
    }



    const handleSubmit = async ({ email, password }) => {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
        });
        
        const request = await res.json();
        if (request.error) {
            if (request.error.message === "EMAIL_EXISTS") {
                const res = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
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
                
                if (!res.error && res.idToken) {
                    localStorage.setItem("idToken", res.idToken);
                    setIsLogin(false);
                    NotificationManager.error("Successful login", 'Auth');
                }
                else {
                    if (request?.error?.message) NotificationManager.error(request.error.message, 'Auth');
                }
                
            }
            else {
                if (request?.error?.message) NotificationManager.error(request.error.message, 'Auth');
            }
        } else {
            localStorage.setItem("idToken", request.idToken);
            setIsLogin(false);
            NotificationManager.error("Successful login", 'Auth');
        }
    }

    useEffect(() => {
        localStorage.setItem("idToken", "");
    }, []);


    return (
        <>
            <Menu
                onItemSelect={handleMenuItemSelect}
                isOpen={isOpen}
            />

            <NavBar
                onHamburgerClick={handleHamburgerClick}
                onLoginClick={handleLoginClick}
                isActive={isOpen}
                bgActive={bgActive}
                statusMsg={statusMsg}
            />

            <Modal open={isLogin} onClose={() => { setIsLogin(false) }}>
                <LoginForm onSubmit={handleSubmit} />
            </Modal>
        </>
    );
}

export default MenuHeader;
