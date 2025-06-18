import { Navigate } from "react-router";
import AllPosts from "../components/AllPosts/AllPosts"
import { useAuth } from "../contexts/AuthContext";

const PostsPage = ()=>{
    const{isAuth} = useAuth();
    if(!isAuth) {
        return <Navigate to='/signin' replace/>   //допзащита
    }
    return(
        <div className="posts__block">
            <h2>All posts</h2>
            <AllPosts />
        </div>
    );
};

export default PostsPage;