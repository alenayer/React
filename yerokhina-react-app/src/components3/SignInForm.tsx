import { useEffect, useRef } from 'react';
import './SignInForm.css'

interface SignInFormProps {
    onSubmit: () => void;
}

export const SignInForm = ({ onSubmit }: SignInFormProps) => {
    // Ref для поля email
    const emailRef = useRef<HTMLInputElement>(null);
    // Автофокус при загрузке формы на email
    useEffect(() => {
        emailRef.current?.focus();
    })
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    }
    return (
        <form className='signIn__form' onSubmit={handleSubmit}>
            <div className='form__group'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Enter your email'
                    ref={emailRef}
                />
            </div>
            <div className='form__group'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder='Enter your password'
                />
            </div>
            <button
                type='submit'
                className='submit__btn'
            >
                Sign In
            </button>
        </form>
    )
}