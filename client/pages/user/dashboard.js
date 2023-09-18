import { useContext, useState } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { userRouter, useRouter } from "next/router";
import axios from "axios";

const UserDashboard = () => {
    const [state, setState] = useContext(UserContext);
   //state
    const [content, serContent] = useState("");
    //route
    const router = useRouter();

    const postSubmit = async (e)=>{
        e.preventDefault();
        console.log("post==>", content );
        try{
            const {data} =await axios.post('/create-post',{content});

        }catch(err){

        }
    };

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image  text-light ">
                    <div className="col text-center">
                        <h1>Newsfeed page</h1>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-md-8">
                        <CreatePostForm content={content} setContent={serContent} postSubmit={postSubmit}/>
                    </div>
                    <div className="col-md-4">
                        Sidebar
                    </div>
                </div>
            </div>
        </UserRoute>)
}
export default UserDashboard;