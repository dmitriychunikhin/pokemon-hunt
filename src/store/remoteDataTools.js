
export const remoteDataDefault = {
    loading: "idle",
    data: null,
    error: null
};

export const remoteDataReducer = (stateField) => (state, { payload: { type, data, error } }) => {
    switch (type) {
        case "init":
            return ({ ...state, [stateField]: { ...remoteDataDefault, loading: "pending" } });

        case "resolve":
            return ({ ...state, [stateField]: { ...state[stateField], data, loading: "idle" } });

        case "reject":
            return ({ ...state, [stateField]: { ...state[stateField], error, loading: "idle" } });
        default:
            return ({ ...state, [stateField]: { ...remoteDataDefault } })
    }
}

export const remoteDataFetcher = (action, resolver, rejecter) => (...resolverArgs) => async (dispatch) => {

    dispatch(action({ type: "init" }));

    try {
        const data = await resolver(...resolverArgs);
        dispatch(action({ type: "resolve", data }));
    }
    catch (err) {
        const errHandled = (rejecter || ((err) => err))(err)
        dispatch(action({ type: "reject", error: errHandled.toString() }))
    }
};

