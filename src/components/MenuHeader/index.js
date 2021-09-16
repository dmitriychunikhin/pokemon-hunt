import { useState } from "react";

import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = ({bgActive}) => {

    const [isOpen, setOpen] = useState(null);

    const handlePageChange = () => {
        setOpen(false);
    }

    const handleHamburgerClick = () => {
        setOpen(!isOpen);
    }

    return (
        <>
            <Menu
                onPageChange={handlePageChange}
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
