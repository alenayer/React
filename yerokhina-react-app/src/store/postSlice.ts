import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/post";
import { fetchPosts } from "./postsThunk";


type PostState = {
    selectedPost: Post | null;
    isPreviewOpen: boolean;
    // для картинок
    selectedImage: string | null,
    isImagePreviewOpen: boolean,
    // для лайков
    posts: Post[],
    // tabs
    activeTab: 'all' | 'popular',

    loading: boolean,
    error: string | null,

}

const initialState: PostState = {
    selectedPost: null,
    isPreviewOpen: false,
    // для картинок
    selectedImage: null,
    isImagePreviewOpen: false,
    // для лайков
    posts: [],
    activeTab: 'all',
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
        // tabs
        setActiveTab: (state, action: PayloadAction<'all' | 'popular'>) => {
            state.activeTab = action.payload;
        }
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
    setActiveTab } = postSlice.actions;

export default postSlice.reducer;