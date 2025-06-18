import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext"
import { SuccessMode } from "../components/SuccessMode/SuccessMode";
import { SignInForm } from "../components/SignInForm/SignInForm";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const SignInPage = ()=>{
    const navigate = useNavigate();
    const{setTheme} = useTheme();
    const[isSuccess, setIsSuccess] = useState(false);
    const{setAuth} = useAuth();

    const handleSubmit = ()=>{
        setTheme('dark');
        setIsSuccess(true);
        setAuth(true)
    }
    const handleViewPosts = ()=>{
        setTheme('light');
       navigate('/posts')
    };

    return(
        <div className="form__block">
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