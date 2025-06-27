import { useEffect } from "react"
import { fetchUsers } from "../store/usersThunks"
import { useAppDispatch, useAppSelector } from "../store/store"
import { errorSelector, isLoadingSelector, usersSelector } from "../store/usersSlice";

export default function UsersPage(){
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const error = useAppSelector(errorSelector);

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])
    return(
        <ul>
            {isLoading&&<h1>Loading</h1>}
            {error && <h1>{error}</h1>}
            {users.map((user)=><li key={user.id}>{user.username}</li>)}
        </ul>
    )
}