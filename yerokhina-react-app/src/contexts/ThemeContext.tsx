import { createContext, useContext, type PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleTheme } from '../store/themeSlice';

type Theme = 'dark' | 'light';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    const dispatch = useAppDispatch();
    const reduxTheme = useAppSelector(state=>state.theme.mode); //Берем тему из redux

    const setTheme =(newTheme:Theme)=>{
        dispatch(toggleTheme(newTheme))
    }
   
    return (
                <ThemeContext value={{ theme:reduxTheme, setTheme}}>
                    {children}
                </ThemeContext>
            )
}

export const useTheme = () => {
        const context = useContext(ThemeContext);
        if (!context) {
            throw new Error('useTheme должна использоваться с ThemeProvider');
        }
        return context;
    }