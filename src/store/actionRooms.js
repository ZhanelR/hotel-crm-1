import { ROOMS_TYPES } from "./roomsActionTypes";

export const getRooms = () => ({ 
    type: ROOMS_TYPES,  
});
//export const getRoomsSuccess = (roomsData) => ({ type: ACTION_TYPES.GET_ROOMS_SUCCESS, payload: roomsData });