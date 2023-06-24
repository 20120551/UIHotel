import { service } from "@constant/index";

export const getServiceByCategory = payload => ({
    type: service.GET_CARD_BY_CATEGORY,
    payload
})