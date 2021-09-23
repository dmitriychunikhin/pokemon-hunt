import { useState } from "react";

import Menu from "components/Menu";
import NavBar from "components/NavBar";

const MenuHeader = ({bgActive}) => {

    const [isOpen, setOpen] = useState(null);

    const handleMenuItemSelect = () => {
        setOpen(false);
    }

    const handleHamburgerClick = () => {
        setOpen(!isOpen);
    }

    return (
        <>
            <Menu
                onItemSelect={handleMenuItemSelect}
                isOpen={isOpen}
            />

            <NavBar
                onHamburgerClick={handleHamburgerClick}
                isActive={isOpen}
                bgActive={bgActive}
            />
        </>
    );
}

export default MenuHeader;
