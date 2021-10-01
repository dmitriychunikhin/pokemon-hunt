import { useState } from "react";
import Input from "components/Input";


const LoginForm = ({ onSubmit }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit && onSubmit({ email, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Email" type="email" required value={email ?? ""} onChange={(value) => { setEmail(value) }} />
            <Input label="Password" type="password" required onChange={(value) => { setPassword(value) }} />
            <button>LOGIN</button>
        </form>
    );
}

export default LoginForm;
