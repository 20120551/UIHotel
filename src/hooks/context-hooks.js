import { AuthContext, UserContext } from './../store/context';
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