import { Route, Redirect } from "react-router-dom";
import { useSelector} from "react-redux";

import { selectIsLoggedIn } from "store/app";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Route
            {...rest}
            render={(props) => 
                isLoggedIn ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    )
}

export default PrivateRoute;