import { useReducer } from 'react';
import { SearchContext } from '@store/context';
import { searchReducer, searchInitialState } from '@store/reducer';

function SearchProvider({ children }) {
    const [state, dispatch] = useReducer(searchReducer, searchInitialState);
    return (
        <SearchContext.Provider value={[state, dispatch]}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;