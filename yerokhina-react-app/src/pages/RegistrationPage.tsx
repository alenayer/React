
import { SuccessModeReg } from "../components/SuccessModeReg/SuccessModeReg";
import { useState } from 'react';
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { RegForm } from "../components/RegForm/RegForm";


const RegistrationPage = ()=>{
    const navigate = useNavigate()
    const {setTheme} = useTheme();
    const [isRegSuccess, setIsRegSuccess] = useState(false);


    const handleSubmit = ()=>{
        setTheme('dark');
        setIsRegSuccess(true);
    }
    const handleContinue = ()=>{
        setTheme('light');
        navigate('/signin')
    };

    return(
        <div className="form__block">
            <h2>{isRegSuccess ? 'Registration Confirmation' : 'Sign Up'}</h2>
            {isRegSuccess ? 
            (<SuccessModeReg onReturn={handleContinue} buttonText="Continue to Sign In"/>)
            :
            (<RegForm onSubmit={handleSubmit}/>)
        }
        </div>
    )
}

export default RegistrationPage;