
import { useGetUsersQuery } from "../query/usersApi"
import { selectTheme, useAppSelector } from "../store/store";

export default function UsersPage() {
    const theme = useAppSelector(selectTheme)
    // Используем автоматически сгенерированный хук
    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    return (
        <div className={`users__page ${theme}-theme`}>
            <h2>Users List</h2>
            {isLoading && <p>Loading users...</p>}
            {isError && <div className="error-message">Error:{error.toString()}</div>}

            {users && (
                <ul className="users__list">
                    {users.map(user=>(
                        <li key={user.id} className="user__card">
                          <h3>{user.name}</h3>
                          <p>Email:{user.email}</p>
                          <p>Phone:{user.phone}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
     
    )
}