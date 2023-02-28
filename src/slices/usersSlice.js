import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
};

export const usersSlice = createSlice({
    name: 'user', //или users????? 
    initialState,

    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      clearUser: (state, action) => {
        state.user = null;
      },

      setLoginAndPassToStore: (state, action) => {
        state.pass = action.payload.password;
        state.login = action.payload.login;
      }
    },
})

export const {
    setLoginAndPassToStore, 
    clearUser,
    setUser,
} = usersSlice.actions

export default usersSlice.reducer
