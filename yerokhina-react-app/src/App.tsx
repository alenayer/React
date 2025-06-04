
import { useState } from 'react';
import './App.css'
import BurgerButton from './components/BurgerButton'
import Title from './components/Title'

function App() {
  const [state, setState] = useState<'active'|'inactive'>('inactive');  //хранит текущее состояние кнопки
  const handleClick = ()=>{    //переключатель из одного состояния в другое
    setState(state==='active'?'inactive':'active')
  }

  return (
    <>
      <div>
        <Title content='sign in' />
      </div>

      <BurgerButton state={state} onClick={handleClick}/>
    </>
  )
}

export default App