import { useReducer } from 'react';
import { ServiceContext } from './../context';
import { serviceReducer, serviceInitialState } from '@store/reducer';

function ServiceProvider({ children }) {
    const [state, dispatch] = useReducer(serviceReducer, serviceInitialState);
    return (
        <ServiceContext.Provider value={[state, dispatch]}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceProvider;