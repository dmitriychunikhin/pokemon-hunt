import { useState } from "react";
import cn from "classnames";
import s from "./style.module.css";


const Input = ({ type = "text", label, value, required = false, onChange }) => {
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        setIsValid(e.target.value && true);
        onChange && onChange(e.target.value);
    }

    return (
        <div className={s.root}>
            <input
                type={type}
                className={cn(s.input, { [s.valid]: isValid })}
                required={required}
                value={value}
                onChange={handleChange} />

            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    );
}

export default Input;