import { useReducer } from 'react';
import { InvoiceContext } from './../context';
import { invoiceReducer, invoiceInitialState } from '@store/reducer';

function InvoiceProvider({ children }) {
    const [state, dispatch] = useReducer(invoiceReducer, invoiceInitialState);
    return (
        <InvoiceContext.Provider value={[state, dispatch]}>
            {children}
        </InvoiceContext.Provider>
    )
}

export default InvoiceProvider;