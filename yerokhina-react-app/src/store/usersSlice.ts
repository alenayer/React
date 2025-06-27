import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';
import { fetchUsers } from './usersThunks';
import type { RootState } from './store';


// Define a type for the slice state
export interface UsersState {
  users: User[],
  isLoading: boolean,
  error: string,
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending,(state)=>{
      state.isLoading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action: PayloadAction<string>) => {  //придет ошибка(строка)
      state.isLoading = false;
      state.error = action.payload;
    })
  },
})


// export const {extraReducers  } = usersSlice.actions

export default usersSlice.reducer

export const usersSelector = (state:RootState)=>state.users.users;
export const isLoadingSelector = (state:RootState)=>state.users.isLoading;
export const errorSelector = (state:RootState)=>state.users.error;
