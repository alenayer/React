
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Post } from '../types/post';

type ApiResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Post[],
}

// Для списка постов с пагинацией и поиском
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async ({
        page = 1,
        limit = 20, //По умолч
        search = ''
    }: {
        page?: number;
        limit?: number;
        search?: string
    }) => {
        const offset = (page - 1) * limit;
        const url = `https://studapi.teachmeskills.by/blog/posts/?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ''
            }`;

        const response = await axios.get<ApiResponse>(url);
        return {
            posts: response.data.results,
            totalCount: response.data.count,
            nextPage: response.data.next,
            prevPage: response.data.previous,
        };
    }
);

// Для получения 1 поста  по id
export const fetchSelectedPost = createAsyncThunk<Post, number>(
    'post/fetchSelectedPost',
    async (id) => {
        const response = await axios.get<Post>(`https://studapi.teachmeskills.by/blog/posts/${id}`);
        return {
            ...response.data,
            likes: 0, //иниц-ция счетчиков
            dislikes: 0,
        }
    }
)


// создание поста
export const createPost = createAsyncThunk(
    'posts/createPost',
    async (formData: FormData) => {
        const response = await axios.post(
            'https://studapi.teachmeskills.by/blog/posts/',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response.data;
    }
)