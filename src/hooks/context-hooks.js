import {
    AuthContext, UserContext, InvoiceContext,
    RoomContext, ServiceContext, SearchContext, RoomDetailContext,
    ReservationCardContext
} from '@store/context';
import { useContext } from 'react';

/**
 *  useReducer + useContext
 */

export const useAuth = function () {
    const [state, dispatch] = useContext(AuthContext);
    return [state, dispatch];
}

export const useUser = function () {
    const [state, dispatch] = useContext(UserContext);
    return [state, dispatch];
}

export const useInvoice = function () {
    const [state, dispatch] = useContext(InvoiceContext);
    return [state, dispatch];
}
// export const useRoomRegulation = function () {
//     const [state, dispatch] = useContext(RoomRegulationContext);
//     return [state, dispatch];
// }

export const useRoom = function () {
    const [state, dispatch] = useContext(RoomContext);
    return [state, dispatch];
}

export const useService = function () {
    const [state, dispatch] = useContext(ServiceContext);
    return [state, dispatch];
}

export const useSearch = function () {
    const [state, dispatch] = useContext(SearchContext);
    return [state, dispatch];
}
export const useReservationCard = function () {
    const [state, dispatch] = useContext(ReservationCardContext);
    return [state, dispatch];
}

export const useRoomDetail = function () {
    const [state, dispatch] = useContext(RoomDetailContext);
    return [state, dispatch];
}