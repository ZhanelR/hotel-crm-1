import { CHECK_OUT_ROOM, CHECK_IN_ROOM } from "./roomsActionTypes";

//здесь ф-ии, создающие экшны
export const checkInRoom = (user, room) => ({ 
    type: CHECK_IN_ROOM,  
    payload: {user, room}
});

export const checkOutRoom = (user, room) => ({ 
    type: CHECK_OUT_ROOM,  
    payload: {user, room}
});
