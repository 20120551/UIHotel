import { auth } from "@constant";

export const login = payload => ({
    type: auth.LOGIN,
    payload
})

export const logout = payload => ({
    type: auth.LOGOUT,
    payload
})

export const profile = payload => ({
    type: auth.PROFILE,
    payload
})