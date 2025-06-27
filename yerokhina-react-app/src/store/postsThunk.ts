
import { createAsyncThunk } from '@reduxjs/toolkit'

import type { Post } from '../types/post';

export const fetchPosts = createAsyncThunk<Post[]>(
    'post/fetchPosts',
    async () => {
            const response = await fetch('https://studapi.teachmeskills.by/blog/posts/');
            const data = await response.json();
            return data.results;
        } 
)