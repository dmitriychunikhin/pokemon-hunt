import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "app",
    initialState: {
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