import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "statusBar",
    initialState: {
        statusMsg: [
            {
                //message template (example for root page)
                //feel free to add messages from any page via setStatusMsg action
                path: "/",
                exact: true,
                text: null
            }]
    },
    reducers: {
        setStatusMsg: (state, { payload: { exact, text } }) => {
            const path = document.location.pathname;
            return {
                ...state,
                statusMsg: [
                    ...state.statusMsg.filter(item => item.path !== path && item.exact !== exact),
                    { path, exact, text }
                ]
            }
        }
    }

});


export const selectStatusMsgText = state => {
    const currentPath = document.location.pathname;
    return state.statusBar.statusMsg
        .reduce((acc, { path, exact, text }) => {
            if (!path || !text) return acc;
            if (currentPath.indexOf(path) === -1) return acc;
            if (exact && currentPath !== path) return acc;
            acc.push(text);
            return acc;
        }, [])
        .join("/")

}

export const { setStatusMsg } = slice.actions;

export default slice.reducer;
