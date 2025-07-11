import './Layout.css'
import { useState, type PropsWithChildren } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { selectTheme, useAppDispatch, useAppSelector } from '../../store/store';
import { toggleTheme } from '../../store/themeSlice';

interface LayoutProps {
    title: string;
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
    const [menuState, setMenuState] = useState<'active' | 'inactive'>('inactive');  //хранит текущее состояние кнопки
    const navigate = useNavigate();
    const { isAuth, setAuth } = useAuth();
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();


    const handleHomeClick = () => {
        navigate('/');
        setMenuState('inactive'); //закрываем меню при переходе
    }

    const handleMenuClick = () => {    //переключатель из одного состояния в другое
        setMenuState(menuState === 'active' ? 'inactive' : 'active')
    }

     // перекл темы
     const handleThemeToggle =()=>{
        const newTheme = theme === 'light' ? 'dark':'light';
        dispatch(toggleTheme(newTheme)) //Обновили через контекст который диспатчит из Redux
    }
     
     const handleSignOut =()=>{
       setAuth(false);
       sessionStorage.removeItem('access')
       sessionStorage.removeItem('refresh')
      
    }
    

    return (
        <div className={`layout ${theme}__theme`}>
            <header className='header'>
                <div className='header-left'>
                    <BurgerButton state={menuState} onClick={handleMenuClick} />
                    <div className='app__logo' onClick={handleHomeClick}>MyApp</div>
                </div>
                <div className='header-right'>
                    {isAuth ?
                        (<>
                            <NavLink to='/posts' className='header__link'>Posts</NavLink>
                            <NavLink to='/users' className='header__link'>Users</NavLink>

                            <button onClick={handleSignOut} className='logout__btn'>Sign Out</button>
                        </>)
                        :
                        (<>
                            <NavLink to='/registration' className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Sign Up</NavLink>
                            <NavLink to='/signin' className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Sign In</NavLink>
                        </>
                        )}

                        <button onClick={handleThemeToggle}>Поменять тему</button>
                </div>
            </header>
            {/* Боковое меню */}
            <div className={`side-menu ${menuState} ${theme}-theme`}>
                <nav className='side-menu__nav'>
                    <NavLink to='/' className='side-menu__link' onClick={()=>setMenuState('inactive')}>Home</NavLink>
                    <NavLink to='/posts' className='side-menu__link' onClick={()=>setMenuState('inactive')}>Posts</NavLink>

                    <NavLink to='/users' className='side-menu__link' onClick={()=>setMenuState('inactive')}>Users</NavLink>

                    <NavLink to='/registration' className='side-menu__link' onClick={()=>setMenuState('inactive')}>Sign Up</NavLink>
                    <NavLink to='/signin' className='side-menu__link' onClick={()=>setMenuState('inactive')}>Sign In</NavLink>
                </nav>
            </div>
           
            {/* Основной контент */}
            <main className='layout__content'>
                <button className='layout__btn'
                    onClick={handleHomeClick}
                >Back home</button>
                <h1 className='layout__title'>{title}</h1>
                <div className={`layout__inner ${theme}__inner`}>{children}</div>
            </main>
            <footer className='footer'>
                © 2025 MyApp. All rights reserved.
            </footer>
        </div>
    )
}