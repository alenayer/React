import './Layout.css'
import { useEffect, useState, type PropsWithChildren } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectTheme} from '../../store/themeSlice';
import { fetchProfile } from '../../store/profileThunk';
import UserDropDown from '../UserDropDown/UserDropDown';

interface LayoutProps {
    title: string;
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
    const [menuState, setMenuState] = useState<'active' | 'inactive'>('inactive');  //хранит текущее состояние кнопки
    const navigate = useNavigate();
    const { isAuth} = useAuth();
    const theme = useAppSelector(selectTheme);
   
    const dispatch = useAppDispatch();


    useEffect(()=>{
        if(isAuth){
            dispatch(fetchProfile())
        }
    },[isAuth, dispatch])


    const handleHomeClick = () => {
        navigate('/');
        setMenuState('inactive'); //закрываем меню при переходе
    }

    const handleMenuClick = () => {    //переключатель из одного состояния в другое
        setMenuState(menuState === 'active' ? 'inactive' : 'active')
    }

    

    return (
        <div className={`layout ${theme}__theme`}>
            <header className='header'>
                <div className='header-left'>
                    <BurgerButton state={menuState} onClick={handleMenuClick} />
                    <div className='app__logo' onClick={handleHomeClick}>Home</div>
                    <NavLink to='/posts' className='header__link'>Posts</NavLink>

                    {/* jsonplaceholder (create-posts-other) */}
                    <NavLink to='/create-post-other'>Создать пост на jsonplaceholder</NavLink>
                    <NavLink to='/create-user'>Создать пользователя на jsonplaceholder</NavLink>
                </div>
                <div className='header-right'>
                    {isAuth ?
                        (<>
                            <NavLink to='/users' className='header__link'>Users</NavLink>

                            {/* Отображаем пользователя */}
                            <UserDropDown/>
                        </>)
                        :
                        (<>
                            <NavLink to='/registration' className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Sign Up</NavLink>
                            <NavLink to='/signin' className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}>Sign In</NavLink>
                        </>
                        )}

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