import { PostCard } from "../components/PostCard/PostCard";
import { favoritesPostsSelector } from "../store/postSlice";
import { useAppSelector } from "../store/store";

export const FavoritesPosts = ()=>{
    const favoritesPosts = useAppSelector(favoritesPostsSelector);
    return(
<>
        <h2>Favorites</h2>
        {favoritesPosts.map(post => (
                <PostCard post = {post} key={post.id}/>
             ))}
        
         </>
    )
   
}