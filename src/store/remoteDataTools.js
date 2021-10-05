
export const remoteDataDefault = {
    isPending: false,
    isFullfilled: false,
    isResolved: false,
    isRejected: false,
    data: null,
    error: null
};

export const remoteDataReducer = (stateField) => (state, { payload: { type, data, error } }) => {

    switch (type) {
        case "init":
            {
                const newState = { ...remoteDataDefault, isPending: true };
                return stateField ? { ...state, [stateField]: newState } : { ...state, ...newState };
            }

        case "resolve":
            {
                const newState = { ...remoteDataDefault, data, isResolved: true, isFullfilled: true };
                return stateField ? { ...state, [stateField]: newState } : { ...state, ...newState };
            }

        case "reject":
            {
                const newState = { ...remoteDataDefault, error, isRejected: true, isFullfilled: true };
                return stateField ? { ...state, [stateField]: newState } : { ...state, ...newState };
            }
        default:
            {
                const nextState = { ...remoteDataDefault };
                return stateField ? { ...state, [stateField]: nextState } : { ...state, ...nextState };
            }
    }
}

export const remoteDataFetcher = (action, resolver, rejecter) => (actionProps) => async (dispatch) => {

    const {init=true, props} = (actionProps || {});

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

