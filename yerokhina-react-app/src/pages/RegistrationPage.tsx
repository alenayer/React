
import { SuccessModeReg } from "../components/SuccessModeReg/SuccessModeReg";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { RegForm } from "../components/RegForm/RegForm";
import { useAppSelector } from "../store/store";
import { isUserCreated } from "../store/usersSlice";


const RegistrationPage = ()=>{
    const navigate = useNavigate()
    const {setTheme} = useTheme();
    const isRegSuccess = useAppSelector(isUserCreated);



    const handleContinue = ()=>{
        setTheme('light');
        navigate('/')
    };

    return(
        <div className="form__block">
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