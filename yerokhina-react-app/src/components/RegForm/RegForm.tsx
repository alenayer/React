import { useEffect, useRef, useState } from 'react';
import './RegForm.css'
import { useAppDispatch } from '../../store/store';
import { createUser } from '../../store/usersThunk';


export const RegForm = () => {

    const dispatch = useAppDispatch();

    // Refs для управления фокусом в инпутах
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // Состояния полей формы

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    // Автофокус на поле username при загрузке формы
    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    // Состояния ошибок
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    //обработчики изменений для всех полей
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); //предоствратили перезагрузку стр

        // Сброс ошибок
        setUserNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('')


        // проверка формы перед отправкой
        let validated = true;


        // Проверки на пустоту
        if (!username.trim()) {
            setUserNameError('Введите имя пользователя');
            usernameRef.current?.focus();
            validated = false;
        }
      
        if (!email.trim() || !email.includes('@')) {
            setEmailError('Введите корректный Email');
            if(validated) emailRef.current?.focus();  //фокус только если нет предыдущих ошибок
            validated = false;
        }

        if (!password) {
            setPasswordError('Введите пароль');
            if(validated) passwordRef.current?.focus();
            validated = false;
        }

        if (!confirmPassword || password !== confirmPassword) {
            setConfirmPasswordError('Пароли не совпадают');
            if(validated) confirmPasswordRef.current?.focus();
            validated = false;
        }

        //    все ок -> 
        if (validated) {
          dispatch(createUser({username,email, password,course_group:18}))
        }

    }
    return (
        <form className="reg__form" onSubmit={handleSubmit}>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your name"
                   ref={usernameRef}
                />
                {userNameError && <div className='form__error-message'>{userNameError}</div>}
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    ref={emailRef}

                />

                {emailError && <div className='form__error-message'>{emailError}</div>}
            </div>
            <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Create a password"
                    ref={passwordRef}
                />
                {passwordError && <div className='form__error-message'>{passwordError}</div>}
            </div>
            <div className="form__group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Repeat your password"
                    ref={confirmPasswordRef}
                />
                {confirmPasswordError && <div className='form__error-message'>{confirmPasswordError}</div>}
            </div>

            <button
                type="submit"
                className="submit__btn"
            >
                Sign up
            </button>
        </form>
    )
}