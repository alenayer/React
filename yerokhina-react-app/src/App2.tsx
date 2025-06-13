import './App2.css'
// import { Layout } from './components2/Layout'
import { Layout } from './components3/Layout'
import {useState} from 'react';
import { RegForm } from './components2/RegForm';
import { SuccessMode } from './components2/SuccessMode';
import { useTheme } from './contexts/ThemeContext';

export function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const{theme, setTheme} = useTheme(); //получаем тему и Ф для ее изменения

  // Обработчик регистрации меняет состояние и тему
  const handleRegister = ()=>{
    setIsRegistered(true);
    if(setTheme){
      setTheme('dark'); //меняем тему на темную после регистрации
    }
    
  }
  // Обработчик возврата меняет состояние и тему
  const handleReturn = ()=>{
    setIsRegistered(false);
    setTheme('light')
  }
 
  return (
    <Layout
     title={isRegistered ? 'Registration confirmation' : 'Sign up'}
     theme={theme}  //используем тему из контекста
     >
      {isRegistered ? (<SuccessMode onReturn={handleReturn} />) : (<RegForm onSubmit={handleRegister} />)}
    </Layout>
  )


}

export default App