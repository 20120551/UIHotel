import { room, search } from "@constant/index";

const roomInitialState = {
  rooms: [],
  room: {},
  roomDisplay: []
};

const roomReducer = (state, action) => {
  let roomDisplay = []
  switch (action.type) {
    case room.GET_FREE_ROOMS:
      console.log("handing event get free room");
      console.log(action.payload.rooms);
      return {
        ...state,
        rooms: action.payload.rooms.sort((a, b) => a.id > b.id ? 1 : -1),
      };
    case room.GET_ROOM_DETAIL:
      console.log("handing event get detail room");
      console.log(action.payload.room);
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

      _rooms.sort((a, b) => a.id > b.id ? 1 : -1);
      return {
        ...state,
        rooms: _rooms,
      };

    case search.REMOVE_CACHE_RESERVATION_CARD:
      console.log("handing event cache reservation card");
      console.log(action.payload.room);
      state.rooms.push(action.payload.room);
      state.rooms.sort((a, b) => a.id > b.id ? 1 : -1);
      return {
        ...state
      };
    case room.PAGINATION_ROOMS:
      console.log("handing event pagination room");
      console.log(action.payload);
      const { page, take } = action.payload;

      roomDisplay = [...state.rooms];
      const rooms = roomDisplay.slice((page - 1) * take, page * take);

    default:
      return { ...state, roomDisplay: rooms };
  }
};

export { roomInitialState };
export default roomReducer;
