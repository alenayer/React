import './Layout.css'
import { useState, type PropsWithChildren } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppSelector } from '../../store/store';

interface LayoutProps {
    title: string;
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
    const [menuState, setMenuState] = useState<'active' | 'inactive'>('inactive');  //хранит текущее состояние кнопки
    const{theme,setTheme} = useTheme();  //получаем из контекста
    const navigate = useNavigate();
    const { isAuth, setAuth } = useAuth();
    const themeApp = useAppSelector(state=>state.theme.mode)

    const handleHomeClick = () => {
        navigate('/');
        setMenuState('inactive'); //закрываем меню при переходе
    }

    const handleMenuClick = () => {    //переключатель из одного состояния в другое
        setMenuState(menuState === 'active' ? 'inactive' : 'active')
    }

     // перекл темы
     const handleThemeToggle =()=>{
        const newTheme = themeApp === 'light' ? 'dark':'light';
        setTheme(newTheme) //Обновили через контекст который диспатчит из Redux
    }
    

    return (
        <div className={`layout ${themeApp}__theme`}>
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

                            <button onClick={() => setAuth(false)} className='logout__btn'>Sign Out</button>
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