// функцмя которая дергает эндпоинт  за юзерами
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '../types/user';

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        } catch (err: any) {
            return 'Smth went err'
        }
    },
)