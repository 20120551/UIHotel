import { useReducer } from "react";
import { UserContext } from "./../context";
import { userReducer, userInitialState } from "./../reducer";

function StaffProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

export default StaffProvider;
