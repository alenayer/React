import './Layout.css'
import { useState, type PropsWithChildren } from 'react';
import BurgerButton from './BurgerButton';
import { useTheme } from '../contexts/ThemeContext';


interface LayoutProps {
    title: string;
    
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {   //дестр-м обьект 
    const [menuState, setMenuState] = useState<'active' | 'inactive'>('inactive');  //хранит текущее состояние кнопки
    const{theme} = useTheme(); //получаем из контекста (contextTheme - переимнованное Theme чтоб не конфликтовало с пропсом)
    const handleClick = () => {    //переключатель из одного состояния в другое
        setMenuState(menuState === 'active' ? 'inactive' : 'active')
    }

    return (
        <div className={`layout ${theme}__theme`}>
            <header className='header'>
                <BurgerButton state={menuState} onClick={handleClick} />
            </header>
            <div className='layout__content'>
                <button className='layout__btn'>Back home</button>
                <h1 className='layout__title'>{title}</h1>

                <div className={`layout__inner ${theme}__inner`}>{children}</div>

            </div>
            <footer className='footer'>
            © 2023 MyApp. All rights reserved.
            </footer>
        </div>
    )
}