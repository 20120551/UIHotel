import { useAuth } from "../../hooks";

function ProtectComponent({ children, allowRoles = [] }) {
    const [authState] = useAuth();

    // kiểm tra role có được render component hay không
    const authorized = allowRoles.some(role => role === authState.role);
    return (
        authorized
            ? <>
                {children}
            </>
            : <>
                {/* render nothing */}
            </>
    )
}

export default ProtectComponent;