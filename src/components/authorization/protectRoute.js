import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks';

// protect route
function ProtectRoute({ allowRoles = [] }) {
    const [authState] = useAuth();
    const location = useLocation();

    const authorized = allowRoles.some(role => role === authState.role);

    return (
        authorized
            ? <Outlet />
            : authState?.accessToken // nếu đăng nhập với quyền staff nhưng page quyền quản lý
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default ProtectRoute;