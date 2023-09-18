import { useContext } from "react";
import { UserContext } from "../context";
import UserRoute from "../components/routes/UserRoute";

const Dashboard =()=>{
    const [state]= useContext(UserContext);

    return(<UserRoute>
    <div className="container-fluid">
<div className="row">
<div className="col">
    <h1 className="display-1 text-center py-5">Dashboard page</h1>
    {JSON.stringify(state)}
<img src="/images/silhouette.avif" alt="img" />
</div>
</div>
    </div>
    </UserRoute>)
}
export default Dashboard;