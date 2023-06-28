import { createTtl } from "@utls/ttl";
import { auth } from "./../../constant";

const accessToken = localStorage.getItem("accessToken");
const role = localStorage.getItem("role");

const DEFAULT_TTL = 1 * 60 * 60 * 1000; // 1hour
const authInitialState = {
  accessToken: accessToken
    ? JSON.parse(accessToken)
    : { accessToken: "", ttl: 0 },
  role: role || "",
  user: null,
};

function createDefaultAccessToken(accessToken) {
  return {
    accessToken,
    ttl: createTtl(DEFAULT_TTL),
  };
}

const authReducer = (state, action) => {
  switch (action.type) {
    case auth.LOGIN:
      //call api to server
      const { user, accessToken = "" } = action.payload;

      const token = createDefaultAccessToken(accessToken);
      // lưu vào local storage
      localStorage.setItem("accessToken", JSON.stringify(token));
      localStorage.setItem("role", user.roles);

      return { accessToken: token, role: user.roles, user };
    case auth.LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      return { accessToken: "", role: "" };
    case auth.PROFILE:
      console.log("handle get auth profile");
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
      };
    // refresh token case
    default:
      return { ...state };
  }
};

export { authInitialState };
export default authReducer;
