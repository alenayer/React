import { useState } from 'react'
import './App3.css'
import { Layout } from './components3/Layout'
import { SuccessMode } from './components3/SuccessMode'
import { SignInForm } from './components3/SignInForm';
import { useTheme } from './contexts/ThemeContext';

export function App3() {
    const [isSuccess, setIsSuccess] = useState(false);
    const { theme, setTheme } = useTheme();  //получаем тему из контекста

    // Обработчик успеха меняет состояние и тему
    const handleSuccess = () => {
        setIsSuccess(true);
        if (setTheme) {
            setTheme('dark'); //меняем тему на темную сразу
        }

    }
    // Обработчик возврата меняет состояние и тему
    const handleReturn = () => {
        setIsSuccess(false);
        setTheme('light')  //возвращаем светлую
    }
    return (
        <Layout
            title={isSuccess ? "Success" : "Sign In"}
            theme={theme}  //используем из контекста
        >
            {isSuccess ? (<SuccessMode onAction={handleReturn} />)
                : (<SignInForm onSubmit={handleSuccess} />)}
        </Layout>
    );
}

export default App3