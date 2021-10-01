import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "app",
    initialState: {
        authData: {
            idToken: null
        },
        navBarStatusMsg: [
            {
                //message template (example for root page)
                //feel free to add messages from any page via setNavBarStatusMsg action
                path: "/",
                exact: true,
                text: null
            }]
    },
    reducers: {
        setAuthIdToken: (state, { payload: { idToken } }) => {
            localStorage.setItem("idToken", idToken);
            return { ...state, authData: { ...state.authData, idToken } };
        },
        setNavBarStatusMsg: (state, { payload: { exact, text } }) => {
            const path = document.location.pathname;
            return {
                ...state,
                navBarStatusMsg: [
                    ...state.navBarStatusMsg.filter(item => item.path !== path && item.exact !== exact),
                    { path, exact, text }
                ]
            }
        }
    }

});

export const selectIsLoggedIn = state => (state.app.authData?.idToken || false) && true;
export const { setAuthIdToken } = slice.actions;

export const selectNavBarStatusMsgText = state => {
    const currentPath = document.location.pathname;
    return state.app.navBarStatusMsg
        .reduce((acc, { path, exact, text }) => {
            if (!path || !text) return acc;
            if (currentPath.indexOf(path) === -1) return acc;
            if (exact && currentPath !== path) return acc;
            acc.push(text);
            return acc;
        }, [])
        .join("/")

}

export const { setNavBarStatusMsg } = slice.actions;

export default slice.reducer;