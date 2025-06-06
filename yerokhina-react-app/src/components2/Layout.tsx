import { type PropsWithChildren } from 'react';
import './Layout.css'
 interface LayoutProps {
    title:string;
    theme?:'light'|'dark';
    
 }
 
 
 export const Layout = ({title,theme='light',children}:PropsWithChildren<LayoutProps>)=>{   //дестр-м обьект 
    return (
        <div className={`layout ${theme}__theme`}>
            <header className='header'>

            </header>
            <div className='layout__content'>
                <button className='layout__btn'>Back home</button>
                <h1 className='layout__title'>{title}</h1>

                <div className={`layout__inner ${theme}__inner`}>{children}</div>

            </div>
        </div>
    )
 }