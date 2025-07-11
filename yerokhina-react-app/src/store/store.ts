import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { useDispatch, useSelector } from 'react-redux';
import themeReducer from './themeSlice'
import postReducer from './postSlice'
import usersReducer from './usersSlice'
import { usersApi } from '../query/usersApi';


export const store = configureStore({
  reducer: {
    counter:counterReducer,
    theme:themeReducer,
    post:postReducer,
    users:usersReducer,
   
    [usersApi.reducerPath]:usersApi.reducer,
    
  },
  middleware:(getDefaultMiddleware)=>   //возвращаем массив middleware
    getDefaultMiddleware().concat(usersApi.middleware)
  
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


export const selectTheme = (state:RootState) => state.theme.mode;