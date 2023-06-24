import { room } from "@constant/index";

const roomInitialState = {
    rooms: []
}

const roomReducer = (state, action) => {
    switch (action.type) {
        case room.GET_FREE_ROOMS:
            console.log("handing event get free room");
            console.log(action.payload.rooms);
            return {
                ...state,
                rooms: action.payload.rooms
            };
        default:
            return { ...state }
    }
}

export { roomInitialState };
export default roomReducer;