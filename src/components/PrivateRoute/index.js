import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "store/user";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;