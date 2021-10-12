
export const remoteDataDefault = {
    isPending: false,
    isFullfilled: false,
    isResolved: false,
    isRejected: false,
    data: null,
    error: null
};

export const remoteDataReducer = (stateField) => (state, { payload: { type, data, error } }) => {
    let newState = { ...remoteDataDefault };

    switch (type) {
        case "init":
            newState = { ...newState, isPending: true };
            break;

        case "resolve":
            newState = { ...newState, data, isResolved: true, isFullfilled: true };
            break;

        case "reject":
            newState = { ...newState, error, isRejected: true, isFullfilled: true };
            break;

        default:
            break;
    }
    return stateField ? { ...state, [stateField]: newState } : { ...state, ...newState };
}

export const remoteDataFetcher = (action, resolver, rejecter) => (actionProps) => async (dispatch) => {

    const { init = true, props } = (actionProps || {});

    if (action && dispatch && init) dispatch(action({ type: "init" }));

    try {
        const data = await resolver(props);
        if (action && dispatch) dispatch(action({ type: "resolve", data }));
        return { data };
    }
    catch (err) {
        const errHandled = (rejecter || (err => err))(err);
        const errMsg = errHandled?.message || String(errHandled);
        if (action && dispatch) dispatch(action({ type: "reject", error: errMsg }));
        return { error: errMsg };
    }
};
