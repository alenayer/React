import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../store/store";
import { activateUser } from "../store/usersThunk";
import { useEffect } from "react";
import { isUserActivated, selectActivationError, selectUsersLoading } from "../store/usersSlice";

export const ActivationPage = () => {
    const { uid, token } = useParams();
    const dispatch = useAppDispatch();
    const isActivated = useAppSelector(isUserActivated);
    const error = useAppSelector(selectActivationError);
    const loading = useAppSelector(selectUsersLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (uid && token && !isActivated && !loading && !error) {
            dispatch(activateUser({ uid, token }))
        }
    }, [uid, token, isActivated])

    useEffect(() => {
        if (isActivated) {
            navigate('/signin')
        }
    }, [isActivated])

    return (
<div>
    {loading && <p>Загрузка...</p>}

    {error && (
        <div>
            <h2>Ошибка</h2>
            <p>
            {error.includes('Stale token') ?'Ссылка активации устарела'
            : error.includes('Invalid Token') ?  'Неверная ссылка активации'
            :'Произошла ошибка активации'}
            </p>
            
            {error.includes('Stale token')&& (
                <button onClick={()=>navigate('/registration')}
                >Зарегистрироваться снова</button>
            )}
        </div>
    )}

    {!loading && !error && !isActivated && (
        <p>Проверка ссылки активации...</p>
    )}
</div>


    )
    // крутелка
}