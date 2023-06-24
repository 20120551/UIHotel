import { service } from "@constant/index";

const serviceInitialState = {
    services: []
}

const serviceReducer = (state, action) => {
    switch (action.type) {
        case service.GET_CARD_BY_CATEGORY:
            console.log("handling get card by category event");
            console.log(action.payload.services)
            return {
                ...state,
                services: action.payload.services
            }
        default:
            return { ...state }
    }
}

export { serviceInitialState };
export default serviceReducer;