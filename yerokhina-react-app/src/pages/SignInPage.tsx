import { useState } from "react";
import { SuccessMode } from "../components/SuccessMode/SuccessMode";
import { SignInForm } from "../components/SignInForm/SignInForm";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { selectTheme, useAppSelector } from "../store/store";

const SignInPage = ()=>{
    const navigate = useNavigate();
    const theme = useAppSelector(selectTheme)
    const[isSuccess, setIsSuccess] = useState(false);
    const{setAuth} = useAuth();

    const handleSubmit = ()=>{
        setIsSuccess(true);
        setAuth(true)
    }
    const handleViewPosts = ()=>{
       navigate('/posts')
    };

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