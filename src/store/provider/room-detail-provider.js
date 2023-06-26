import { useReducer } from 'react';
import { RoomDetailContext } from './../context';
import { roomDetailReducer, roomDetailInitialState } from './../reducer';

function RoomDetailProvider({ children }) {
    const [state, dispatch] = useReducer(roomDetailReducer, roomDetailInitialState);
    return (
        <RoomDetailContext.Provider value={[state, dispatch]}>
            {children}
        </RoomDetailContext.Provider>
    )
}

export default RoomDetailProvider;