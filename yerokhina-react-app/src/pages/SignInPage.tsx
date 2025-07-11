import { useState } from "react";
import { SuccessMode } from "../components/SuccessMode/SuccessMode";
import { SignInForm } from "../components/SignInForm/SignInForm";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../store/store";

import { createJwt } from "../store/authThunk";
import { fetchProfile } from "../store/profileThunk";
import { selectTheme } from "../store/themeSlice";


const SignInPage = ()=>{
    const navigate = useNavigate();
    const theme = useAppSelector(selectTheme)
    const[isSuccess, setIsSuccess] = useState(false);
    const{setAuth} = useAuth();

    const dispatch = useAppDispatch();

    const handleViewPosts = ()=>{
        setAuth(true);
        navigate('/posts')
        dispatch(fetchProfile())
     };
    const handleSubmit = (email:string, password:string)=>{
       dispatch(createJwt({
        data:{email,password},
        navigate:()=>{
            setIsSuccess(true)
        },
       }
    ))  
    }
    
    return(
        <div className={`form__block ${theme}-theme`}>
            <h2>{isSuccess?'Success':'Sign in'}</h2>
            {isSuccess ? 
            (<SuccessMode onAction={handleViewPosts} buttonText="View Posts"/>)
            :
            (<SignInForm onSubmit={handleSubmit}/>)
         } 
        </div>
    )
}
export default SignInPage;