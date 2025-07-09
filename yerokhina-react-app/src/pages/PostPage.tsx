
import SelectedPost from "../components/SelectedPost/SelectedPost";
import { selectTheme, useAppSelector,  } from "../store/store";


const PostPage = ()=>{
    const theme = useAppSelector(selectTheme);

    
    return(
        <div className={`post-page ${theme}-theme`}>
        <SelectedPost />
        </div>
          
    )
}
   
   

   
export default PostPage;