import { Link } from "react-router";
import './NotFound.css'
import { selectTheme, useAppSelector } from "../../store/store";

const NotFound = () =>{
  const theme = useAppSelector(selectTheme)

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