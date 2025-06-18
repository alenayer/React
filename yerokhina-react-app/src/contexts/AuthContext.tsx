import { createContext, useContext, useState, type PropsWithChildren } from "react";

type AuthContextType = {
    isAuth:boolean;
    setAuth:(value:boolean)=>void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuth, setAuth] = useState(false)


    return (
        <AuthContext value={{ isAuth, setAuth}}>
            {children}
        </AuthContext>
    )
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useTheme должна использоваться с ThemeProvider');
    }
    return context;
}