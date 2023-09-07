import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface user {
    user:string ;
}
const initialState: user = {
    user: 'HoMz2QXJ3GO8dFnc2HWUIuafmCp1', 
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