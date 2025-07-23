
import { SuccessModeReg } from "../components/SuccessModeReg/SuccessModeReg";
import { useNavigate } from "react-router";
import { RegForm } from "../components/RegForm/RegForm";
import {useAppSelector } from "../store/store";
import { isUserCreated } from "../store/usersSlice";
import { selectTheme } from "../store/themeSlice";


const RegistrationPage = ()=>{
    const navigate = useNavigate()
    const theme = useAppSelector(selectTheme)
    const isRegSuccess = useAppSelector(isUserCreated);

    const handleContinue = ()=>{
        navigate('/')
    };

    return(
        <div className={`form__block ${theme}-theme`}>
            <h2>{isRegSuccess ? 'Registration Confirmation' : 'Sign Up'}</h2>
            {isRegSuccess ? 
            (<SuccessModeReg onReturn={handleContinue}/>)
            :
            (<RegForm/>)
        }
        </div>
    )
}

export default RegistrationPage;