import { useEffect, useState } from "react";
import Input from "components/Input";
import s from "./style.module.css"


const LoginForm = ({ onSubmit, isReset }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit && onSubmit({ email, password, isSignUp });
    }

    useEffect(() => {
        if (!isReset) return;
        setEmail('');
        setPassword('');
    }, [isReset])

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Email" type="email" required value={email} onChange={(value) => { setEmail(value) }} />
            <Input label="Password" type="password" required value={password} onChange={(value) => { setPassword(value) }} />
            <div className={s.actionWrap}>
                <button>{isSignUp ? "Register" : "Login"}</button>
                <div className={s.actionMode} onClick={() => { setIsSignUp(prev => !prev) }}>{isSignUp ? "?login" : "?register"}</div>
            </div>
        </form>
    );
}

export default LoginForm;
