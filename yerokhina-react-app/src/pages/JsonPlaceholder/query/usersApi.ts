import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../../types/user";

export const usersApi = createApi({
    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com'}),
    endpoints:(builder)=>({
        getUsers:builder.query<User[], void>({   //GET
            query:()=>'/users'
        
        }),
        getUserById:builder.query<User, number>({   //GET
            query:(userId)=>`/users/${userId}`
        }),
        createUser:builder.mutation<User, Partial<User>>({
            query:(data)=>({       //POST
                url:'/users',
                method:'POST',
                body:data,
            })
        })
    })
})

// экспортируем автосгенерированные хуки На основании эндпоинтов
export const {useGetUsersQuery, useGetUserByIdQuery,useCreateUserMutation} = usersApi;