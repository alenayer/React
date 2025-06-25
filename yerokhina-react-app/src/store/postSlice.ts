import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/post";


type PostState = {
    selectedPost: Post | null;
    isPreviewOpen: boolean;
    // для картинок
    selectedImage: string | null,
    isImagePreviewOpen: boolean,
}

const initialState: PostState = {
    selectedPost: null,
    isPreviewOpen: false,
    // для картинок
    selectedImage: null,
    isImagePreviewOpen: false,
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
    }
})

export const {
    openPreview,
    closePreview,
    openImagePreview,
    closeImagePreview } = postSlice.actions;
    
export default postSlice.reducer;