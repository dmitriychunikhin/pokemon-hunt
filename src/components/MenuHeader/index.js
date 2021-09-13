import { useState } from "react";

import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {

    const [isActive, setActive] = useState(undefined);

    const handleClickButton = () => {
        setActive(!isActive);
    }

    return (
        <>
            <Menu isActive={isActive} />

            <NavBar
                onClickButton={handleClickButton}
                isActive={isActive}
            />
        </>
    );
}

export default MenuHeader;
