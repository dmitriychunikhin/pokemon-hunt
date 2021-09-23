import Layout from "components/Layout";
import { useHistory } from "react-router-dom";

const NotFoundPage = () => {
    
    const history = useHistory();

    return (
        <Layout title="404. NotFound">
            <p>Requested page doesn't exist</p>
            <button onClick={()=>{history.push("/")}}>Go to HomePage</button>
        </Layout>
    );
}

export default NotFoundPage;
