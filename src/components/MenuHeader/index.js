import { useState } from "react";

import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = ({ onSetPage }) => {

    const [isActive, setActive] = useState(undefined);

    const handleClickButton = () => {
        setActive(!isActive);
    }

    return (
        <>
            <Menu isActive={isActive} onSetPage={onSetPage} />

            <NavBar
                onClickButton={handleClickButton}
                isActive={isActive}
            />
        </>
    );
}

export default MenuHeader;
