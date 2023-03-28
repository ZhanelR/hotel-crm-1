import { createSlice} from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    currentUser: null,
    error: null,
    isAuthorized: false,
};

export const usersSlice = createSlice({
    name: 'user', //или users????? 
    initialState,

    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setLogout: (state) => {
        state.loginData = null;
        state.isAuthorized = false;
      },

      setLoginSuccess: (state, action) => {
        state.loginData = action.payload;
        state.isAuthorized = true;
      },

      setRegisteredDataToStore: (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.confirmPassword = action.payload.confirmPassword;
      },

      checkInStart(state) {
        state.loading = true;
        state.error = null;
      },
      checkInSuccess(state, action) {
        state.loading = false;
        state.user = action.payload;
      },
      checkInFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
  
    },

    
    }
  )

export const {
    setLoginSuccess, 
    setRegisteredDataToStore,
    setLogout,
    setUser,
    checkInStart,
    checkInSuccess,
    checkInFailure,
  } = usersSlice.actions

export default usersSlice.reducer
