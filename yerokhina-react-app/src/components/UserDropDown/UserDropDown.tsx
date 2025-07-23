import './UserDropDown.css'
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store";

import { clearProfile, selectEmail, selectUsername, setIsAuth } from "../../store/profileSlice";
import { selectTheme, toggleTheme } from '../../store/themeSlice';

const UserDropDown = () =>{
    const [isOpen, setIsOpen]=useState(false);
    const dispatch = useAppDispatch();
  
    // получаем данные профиля из Redux и тему
    const username = useAppSelector(selectUsername) || '';
    const email = useAppSelector(selectEmail) || ''; 
    const theme = useAppSelector(selectTheme);

    const handleSignOut =()=>{
       dispatch(setIsAuth(false));
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        dispatch(clearProfile());
        setIsOpen(false);
    };

    // Получаем 1 букву имени
    const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';

     // перекл темы
     const handleThemeToggle =()=>{
        // const newTheme = theme === 'light' ? 'dark':'light';
        dispatch(toggleTheme());
        setIsOpen(false); //закрыли меню после переключения 
    }
     
    return(
        <div className="user__dropdown">
            <button className="user__dropdown-avatar" onClick={()=>setIsOpen(!isOpen)}>{firstLetter}</button>

            {isOpen && (
                <div className="user__dropdown-menu">
                        <div className='user__dropdown-menu-avatar'>
                            <div className='user__dropdown-menu-avatar-letter'>{firstLetter}</div>
                            </div>
                   
                    <div className="user__dropdown-info">
                      <div className="user__dropdown-name">{username}</div>
                      <div className="user__dropdown-email">{email}</div>
                    </div>
                     {/* Кнопка переключения темы */}
                     <button className='user__dropdown-theme-toggle' onClick={handleThemeToggle}>
                        <div className='user__dropdown-theme-content'>
                            <span>Переключить тему</span>
                            <span className='user__dropdown-theme-indicator'>{theme === 'light' ? '🌞' : '🌙'}</span>
                        </div>
                     </button>
                    <button className="user__dropdown-signout" onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
    )
}

export default UserDropDown;