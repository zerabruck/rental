import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface user {
    user:string ;
}
const initialState: user = {
    user: '', 
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser(state, action: PayloadAction<string>) {
        state.user = action.payload;
      },
      logoutUser(state) {
        state.user = '';
      },
    },
  });
export const {setUser, logoutUser} = authSlice.actions
export default authSlice