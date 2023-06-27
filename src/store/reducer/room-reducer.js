import { room, search } from "@constant/index";

const roomInitialState = {
  rooms: [],
  room: {},
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case room.GET_FREE_ROOMS:
      console.log("handing event get free room");
      console.log(action.payload.rooms);
      return {
        ...state,
        rooms: action.payload.rooms,
      };
    case room.GET_ROOM_DETAIL:
      console.log("handing event get detail room");
      console.log(action.payload.rooms);
      return {
        ...state,
        room: action.payload.room,
      };
    case search.CACHE_RESERVATION_CARD:
      console.log("handing event cache reservation card");
      console.log(action.payload.room);
      const _rooms = state.rooms.filter(
        (room) => room.id !== action.payload.room.id
      );
      return {
        ...state,
        rooms: _rooms,
      };

    case search.REMOVE_CACHE_RESERVATION_CARD:
      console.log("handing event cache reservation card");
      console.log(action.payload.room);
      state.rooms.push(action.payload.room);
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export { roomInitialState };
export default roomReducer;
