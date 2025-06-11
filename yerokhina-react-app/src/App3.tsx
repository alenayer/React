import { useState } from 'react'
import './App3.css'
import { Layout } from './components3/Layout'
import { SuccessMode } from './components3/SuccessMode'
import { SignInForm } from './components3/SignInForm';

export function App3() {
    const [isSuccess, setIsSuccess] = useState(false);
    return (
        <Layout
            title={isSuccess ? "Success" : "Sign In"}
            theme={isSuccess ? 'dark' : 'light'}
        >
            {isSuccess ? (<SuccessMode onAction={() => setIsSuccess(false)} />)
        : (<SignInForm onSubmit={() => setIsSuccess(true)} />)}
        </Layout>
    );
}

export default App3