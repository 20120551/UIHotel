import { AuthContext, UserContext, InvoiceContext, RoomContext, ServiceContext } from '@store/context';
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

export const useRoom = function () {
    const [state, dispatch] = useContext(RoomContext);
    return [state, dispatch];
}

export const useService = function () {
    const [state, dispatch] = useContext(ServiceContext);
    return [state, dispatch];
}