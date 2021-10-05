import { useContext, createContext } from "react";

export const PokeDbContext = createContext(null);

export const usePokeDb = () => {
    return useContext(PokeDbContext);
}