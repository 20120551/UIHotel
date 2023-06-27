import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks';

// protect route
function ProtectRoute({ allowRoles = [] }) {
    const [authState] = useAuth();
    const location = useLocation();

    let authorized = false;
    if (allowRoles.length === 0) {
        authorized = authState?.accessToken ? true : false;
    } else {
        authorized = allowRoles.some(role => role === authState.role);
    }
    console.log(authorized)

    return (
        authorized
            ? <Outlet />
            : authState?.accessToken // nếu đăng nhập với quyền staff nhưng page quyền quản lý
                ? <Navigate to='/401' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default ProtectRoute;