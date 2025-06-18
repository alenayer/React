import { Link } from "react-router";
import { useTheme } from "../../contexts/ThemeContext"
import './NotFound.css'

const NotFound = () =>{
    const{theme}=useTheme();

    return(
        <div className={`not-found ${theme}__inner`}>
            <h2 className="not-found-title">404 not found</h2>
            <p>Извините, запрашиваемая страница не существует</p>

            <Link to='/' className='not-found__link'>
                Вернуться на главную
            </Link>
        </div>
    )
}

export default NotFound;