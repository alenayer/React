
import SelectedPost from "../components/SelectedPost/SelectedPost";
import {useAppSelector,  } from "../store/store";
import { selectTheme } from "../store/themeSlice";


const PostPage = ()=>{
    const theme = useAppSelector(selectTheme);

    
    return(
        <div className={`post-page ${theme}-theme`}>
        <SelectedPost />
        </div>
          
    )
}
   
   

   
export default PostPage;