import { useEffect } from "react";
import SelectedPost from "../components/SelectedPost/SelectedPost";
import { useTheme } from "../contexts/ThemeContext";

const PostPage = ()=>{
    const{setTheme}=useTheme();
    useEffect(()=>{
        setTheme('dark');
        return()=>{
            setTheme('light')
        }
    },[setTheme]
    )
    return(
            <SelectedPost />
    )
}
   
   

   
export default PostPage;