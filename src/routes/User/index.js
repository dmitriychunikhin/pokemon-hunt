import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import s from "./style.module.css";

import * as userStore from "store/user";


const UserPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(userStore.selectUser).data;

    return (
        <div className={s.root}>
            <h1>User account</h1>
            <dl className={s.userInfo}>
                <dt>Email</dt><dd>{user.email}</dd>

                <dt>Registration date</dt><dd>{new Date(user.createdAt).toLocaleDateString()}</dd>

            </dl>

            <button onClick={() => { dispatch(userStore.logout()); history.replace("/"); }}>Logout</button>
        </div >
    );
}

export default UserPage;