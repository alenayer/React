import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    const [theme, setTheme] = useState<Theme>('light')

    


    return (
        <ThemeContext value={{ theme, setTheme}}>
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