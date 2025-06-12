import './App2.css'
// import { Layout } from './components2/Layout'
import { Layout } from './components3/Layout'
import {useState} from 'react';
import { RegForm } from './components2/RegForm';
import { SuccessMode } from './components2/SuccessMode';

export function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <Layout
     title={isRegistered ? 'Registration confirmation' : 'Sign up'}
     theme={isRegistered ? 'dark' : 'light'}
     >
      {isRegistered ? (<SuccessMode onReturn={()=>setIsRegistered(false)} />) : (<RegForm onSubmit={() => setIsRegistered(true)} />)}
    </Layout>
  )


}

export default App