import { auth } from './../../constant';

const accessToken = localStorage.getItem('accessToken');
const role = localStorage.getItem('role');

const authInitialState = {
    accessToken: accessToken || '',
    role: role || "",
    user: null,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case auth.LOGIN:
            //call api to server
            const {
                user,
                accessToken = ''
            } = action.payload;
            // lưu vào local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('role', user.role);

            return { accessToken, role: user.role, user };
        case auth.LOGOUT:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('role');
            return { accessToken: '', role: "" };
        // refresh token case
        default:
            return { ...state }
    }
}

export { authInitialState };
export default authReducer;