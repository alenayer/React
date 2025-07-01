import { PostCard } from "../components/PostCard";
import { popularPostsSelector } from "../store/postSlice";
import { useAppSelector } from "../store/store";

export const PopularPosts = ()=>{
    const popularPosts = useAppSelector(popularPostsSelector);
    return(
<>
        <h2>Popular</h2>
        {popularPosts.map(post => (
                <PostCard post = {post} key={post.id}/>
             ))}
        
         </>
    )
   
}