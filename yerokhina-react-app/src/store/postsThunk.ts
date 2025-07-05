
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Post } from '../types/post';

type ApiResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Post[],
}

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
            nextPage:response.data.next,
            prevPage:response.data.previous,
        };
    }
);