import { useReducer } from 'react';
import { RoomContext } from '@store/context';
import { roomReducer, roomInitialState } from '@store/reducer';

function RoomProvider({ children }) {
    const [state, dispatch] = useReducer(roomReducer, roomInitialState);
    return (
        <RoomContext.Provider value={[state, dispatch]}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomProvider;