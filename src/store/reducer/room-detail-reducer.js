import { roomDetail } from "@constant/index";

const roomDetailInitialState = {
    rooms: [],
    room: {}
}

const roomDetailReducer = (state, action) => {
    switch (action.type) {
        case roomDetail.GET_ALL_ROOM_DETAIL:
            return {
                ...state,
                rooms: action.payload.rooms
            }
        default:
            return { ...state }
    }
}

export { roomDetailInitialState };
export default roomDetailReducer;