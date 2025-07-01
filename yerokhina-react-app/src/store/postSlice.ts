import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/post";
import { fetchPosts } from "./postsThunk";
import type { RootState } from "./store";

type PostState = {
    selectedPost: Post | null;
    isPreviewOpen: boolean;
    // для картинок
    selectedImage: string | null,
    isImagePreviewOpen: boolean,
    // для лайков
    posts: Post[],
    //    для избранных
    favorites: number[],  //массив ID выбранных постов
    // обработка
    loading: boolean,
    error: string | null,
}

const initialState: PostState = {
    selectedPost: null,
    isPreviewOpen: false,
    selectedImage: null,
    isImagePreviewOpen: false,
    posts: [],
    favorites: [],
    loading: false,
    error: null,
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
           if(!state.favorites.includes(action.payload)) {
            state.favorites.push(action.payload);
           }
        },
        removeFromFavorites: (state, action:PayloadAction<number>) =>{
            state.favorites = state.favorites.filter(id=>id!==action.payload)
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload.map((el) => ({ ...el, likes: 0, dislikes: 0 }));
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
                state.error = 'Ошибка загрузки постов'
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
    } = postSlice.actions;

export default postSlice.reducer;


export const popularPostsSelector = (state:RootState)=>{
    // сортировка
 return [...state.post.posts].filter((post)=>post.likes > 3);
}

export const favoritesPostsSelector = (state:RootState)=>{
    // Филтруем посты чьи ID есть в избранном
    return state.post.posts.filter(post=>state.post.favorites.includes(post.id));
}