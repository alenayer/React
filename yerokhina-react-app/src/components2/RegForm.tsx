import './RegForm.css'

interface RegFormProps{
    onSubmit:()=>void;
}

export const RegForm = ({onSubmit}:RegFormProps) =>{
    const handleSubmit = (event:React.FormEvent)=>{
        event.preventDefault(); //предоствратили перезагрузку стр
        onSubmit(); //вызов переданной функции
    }
    return(
        <form className="reg__form" onSubmit={handleSubmit}>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter your name"/>
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email"/>
            </div>
            <div className="form__group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password"/>
            </div>
            <div className="form__group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Repeat your password"/>
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