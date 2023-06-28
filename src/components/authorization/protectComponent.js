import { isExpire } from "@utls/ttl";
import { useAuth } from "../../hooks";

function ProtectComponent({ children, allowRoles = [] }) {
    const [authState] = useAuth();

    // kiểm tra role có được render component hay không
    let authorized = !isExpire(authState.accessToken.ttl) ? true : false;

    if (allowRoles.length > 0) {
        authorized = authorized && allowRoles.some(role => role === authState.role);
    }

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