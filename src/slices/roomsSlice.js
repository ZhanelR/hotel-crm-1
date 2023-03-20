import { createSlice} from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    currentRoom: null,
    error: null,
    //isAuthorized: false,
};

export const roomsSlice = createSlice({
    name: 'room', 
    initialState,

    reducers: {
        addRoomsToStore: (state, action) => {
            console.log(action.payload)
            if (action.payload[0]["table"]) state.items = action.payload[0]["table"]
                return state
    }
}
})

export const {
    addRoomsToStore,
  } = roomsSlice.actions

export default roomsSlice.reducer