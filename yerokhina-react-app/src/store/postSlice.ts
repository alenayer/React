import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/post";
import { createPost, fetchPosts, fetchSelectedPost } from "./postsThunk";
import type { RootState } from "./store";

type RequestType = 'posts' | 'post' | null;

type PostState = {
    selectedPost: Post | null;
    isPreviewOpen: boolean;
    // для картинок
    selectedImage: string | null,
    isImagePreviewOpen: boolean,
    // для лайков
    posts: Post[],
    totalCount: number,
    //    для избранных
    favorites: number[],  //массив ID выбранных постов
    // обработка
    loading: boolean,
    error: string | null,
    currentRequest:RequestType,  //тип текущего запроса
}

const initialState: PostState = {
    selectedPost: null,
    isPreviewOpen: false,
    selectedImage: null,
    isImagePreviewOpen: false,
    posts: [],
    totalCount: 0,
    favorites: [],
    loading: false,
    error: null,
    currentRequest: null

}

// slice для выбранного поста
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        openPreview: (state, action: PayloadAction<Post>) => {
            state.selectedPost = action.payload;
            state.isPreviewOpen = true;
        },
        closePreview: (state) => {
            state.isPreviewOpen = false;
            state.selectedPost = null;
        },
        // для картинок
        openImagePreview: (state, action: PayloadAction<string>) => {
            state.selectedImage = action.payload;
            state.isImagePreviewOpen = true;
        },
        closeImagePreview: (state) => {
            state.isImagePreviewOpen = false;
            state.selectedImage = null;
        },
        likePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((el) => {
                if (el.id === action.payload) {
                    console.log(el.likes)
                    return { ...el, likes: ++el.likes }
                } else {
                    return el;
                }
            })
        },
        disLikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((el) => {
                if (el.id === action.payload) {
                    console.log(el.dislikes)
                    return { ...el, dislikes: ++el.dislikes }
                } else {
                    return el;
                }
            })
        },
        // Закладки
        addToFavorites: (state, action: PayloadAction<number>) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(id => id !== action.payload)
        },

        clearSelectedPost: (state) => {
            state.selectedPost = null;
        }

    },
    extraReducers: (builder) => {
        builder
            // Обработка fetchPosts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentRequest = 'posts'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts.map((post: Post) => ({ ...post, likes: 0, dislikes: 0 }));
                state.totalCount = action.payload.totalCount;
                state.currentRequest = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки постов'
                state.currentRequest = null;
            })
            // Обработка fetchSelectedPost
            .addCase(fetchSelectedPost.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentRequest = 'post';
            })
            .addCase(fetchSelectedPost.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPost = action.payload;
                state.currentRequest = null;
            })
            .addCase(fetchSelectedPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки поста';
                state.currentRequest = null;
            })



            .addCase(createPost.fulfilled, (state,action)=>{
                state.posts.unshift({
                    ...action.payload,
                    likes:0,
                    dislikes:0
                })
            })
    }
})

export const {
    openPreview,
    closePreview,
    openImagePreview,
    closeImagePreview,
    likePost,
    disLikePost,
    addToFavorites,
    removeFromFavorites,
    clearSelectedPost,
} = postSlice.actions;



// Селекторы
export const postsSelector = (state: RootState) => state.post.posts;
export const selectedPostSelector = (state: RootState) => state.post.selectedPost;
export const loadingSelector = (state: RootState) => state.post.loading;
export const errorSelector = (state: RootState) => state.post.error;
export const totalCountSelector = (state: RootState) => state.post.totalCount;

// Умные селекторы загрузки
export const isLoadingPosts = (state:RootState)=>state.post.loading && state.post.currentRequest === 'posts';
export const isLoadingSelectedPost = (state:RootState)=>state.post.loading && state.post.currentRequest === 'post';


// Спец селекторы
export const popularPostsSelector = (state: RootState) => [...state.post.posts].filter((post) => post.likes > 3);
export const favoritesPostsSelector = (state: RootState) => state.post.posts.filter(post => state.post.favorites.includes(post.id));
    // Филтруем посты чьи ID есть в избранном

export default postSlice.reducer;