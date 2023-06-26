import { card, payment, search } from "@constant/index";

export const createCard = payload => ({
    type: card.CREATE_RESERVATION_CARD,
    payload
})

export const createPayment = payload => ({
    type: payment.CREATE_PAYMENT,
    payload
})

export const cacheCard = payload => ({
    type: search.CACHE_RESERVATION_CARD,
    payload
})

export const removeCard = payload => ({
    type: search.REMOVE_CACHE_RESERVATION_CARD,
    payload
})

export const cacheSearch = payload => ({
    type: search.CACHE_SEARCH_INFO,
    payload
})