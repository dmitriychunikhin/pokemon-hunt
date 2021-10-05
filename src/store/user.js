import { createSlice } from "@reduxjs/toolkit";
import { remoteDataDefault, remoteDataReducer, remoteDataFetcher } from "./remoteDataTools";
import authApi from "services/AuthApi";


const saveUserSessionToken = ({ idToken }) => {
    if (!idToken) {
        localStorage.removeItem("user:idToken");
        return;
    }
    localStorage.setItem("user:idToken", idToken);
}

export const getUserSessionToken = () => {
    return localStorage.getItem("user:idToken") || null;
}

const slice = createSlice({
    name: "user",
    initialState: {
        ...remoteDataDefault,
    },
    reducers: {
        setUser: remoteDataReducer(),

        logout: (state) => {
            saveUserSessionToken({ idToken: "" });
            return ({ ...state, ...remoteDataDefault });
        }

    }
});

export default slice.reducer;

export const selectUser = state => state.user;
export const selectIsLoggedIn = state => !!(state.user.data?.localId);

export const logout = slice.actions.logout;

export const signUpInFetch = remoteDataFetcher(
    null,
    async (props) => {
        const res = await authApi.signUpIn(props);
        saveUserSessionToken({ idToken: res.idToken });
        return res;
    }
)

export const userFetch = remoteDataFetcher(
    slice.actions.setUser,
    async () => {
        const idToken = getUserSessionToken();
        if (!idToken) return null;
        return await authApi.getUser({ idToken });
    },
    (err) => {
        saveUserSessionToken({ idToken: "" });
        return err;
    }
)
