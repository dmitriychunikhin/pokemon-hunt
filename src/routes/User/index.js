import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import s from "./style.module.css";

import Layout from "components/Layout";

import * as userStore from "store/user";


const UserPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(userStore.selectUser).data;

    return (
        <Layout title="User profile">
            <div className={s.root}>
                <dl className={s.userInfo}>
                    <dt>Email</dt><dd>{user.email}</dd>

                    <dt>Registration date</dt><dd>{new Date(user.createdAt).toLocaleDateString()}</dd>

                </dl>

                <button onClick={() => { dispatch(userStore.logout()); history.replace("/"); }}>Logout</button>
            </div >
        </Layout>
    );
}

export default UserPage;