import { createSlice} from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    currentRoom: null,
    error: null,
    items: [],
    //isAuthorized: false,
    isShowPopup: false,
};

export const roomsSlice = createSlice({
    name: 'room', 
    initialState,

    reducers: {
        addRoomsToStore: (state, action) => {
            console.log(action.payload)
            if (action.payload[0]["table"]) state.items = action.payload[0]["table"]
                return state
    },
    checkInStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      checkInSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
      },
      checkInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      openPopup: (state) => {
        state.isShowPopup = true
      },
      
      closePopup: (state) => {
        state.isShowPopup = false
      }, 
}
})

export const {
    addRoomsToStore,
    checkInStart,
    checkInSuccess,
    checkInFailure,
    closePopup,
    openPopup,
  } = roomsSlice.actions

export default roomsSlice.reducer