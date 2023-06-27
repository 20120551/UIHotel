import { card, payment, search } from "@constant/index";
import { getVietnameseDate } from "@utls/date";
import { createTtl, isExpire } from "@utls/ttl";

const DEFAULT_TTL = 1 * 60 * 60 * 1000;
const cardInfo = localStorage.getItem("cardInfo");
const searchInfo = localStorage.getItem("searchInfo");

const verify = verifyState({
    cardInfo: cardInfo ? JSON.parse(cardInfo) : [{ ttl: 0 }],
    searchInfo: searchInfo ? JSON.parse(searchInfo) : { ttl: 0 }
});

localStorage.setItem("cardInfo", JSON.stringify(verify.cardInfo));
localStorage.setItem("searchInfo", JSON.stringify(verify.searchInfo));

const searchInitialState = {
    searchInfo: verify.searchInfo,
    cardInfo: verify.cardInfo
}


function createDefaultSearchInfo() {
    const date = new Date();
    date.setDate(date.getDate() + 1)
    return {
        from: getVietnameseDate(),
        to: getVietnameseDate(date),
        type: "Double",
        ttl: createTtl(DEFAULT_TTL)
    }
}

function createDefaultCardInfo() {
    const date = new Date();
    date.setDate(date.getDate() + 1)
    return [{
        ttl: createTtl(DEFAULT_TTL),
        from: getVietnameseDate(),
        to: getVietnameseDate(date),
        items: []
    }]
}

function verifyState({ cardInfo, searchInfo }) {
    const result = {};
    result["searchInfo"] = isExpire(searchInfo.ttl) ? createDefaultSearchInfo() : searchInfo;
    const card = cardInfo.filter(card => !isExpire(card.ttl));
    result["cardInfo"] = card.length === 0 ? createDefaultCardInfo() : card;
    return result;
}

// https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
const searchReducer = (state, action) => {
    const { cardInfo, searchInfo } = state;
    let index = -1;
    let _cardInfo = [];
    let _searchInfo = [];

    switch (action.type) {
        case search.CACHE_RESERVATION_CARD:
            console.log("handling cache reservation card");
            console.log(action.payload);
            index = cardInfo.findIndex(card =>
                card.from === searchInfo.from && card.to === searchInfo.to);

            let isRenew = false;
            if (index !== -1) {
                if (!isExpire(cardInfo[index].ttl)) {
                    cardInfo[index].items.push(action.payload);
                } else { //expire
                    cardInfo.splice(index);
                    isRenew = true;
                }
            }

            if (isRenew === true) {
                cardInfo.push({
                    ttl: createTtl(DEFAULT_TTL),
                    from: searchInfo.from,
                    to: searchInfo.to,
                    items: [action.payload]
                })
            }

            localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
            // _cardInfo = [...cardInfo];

            return {
                ...state
            }
        case search.CACHE_SEARCH_INFO:
            console.log("handling cache search");
            console.log(action.payload);
            _searchInfo = { ...action.payload, ttl: createTtl(DEFAULT_TTL) }
            localStorage.setItem("searchInfo", JSON.stringify(_searchInfo));
            return {
                ...state,
                searchInfo: _searchInfo
            }

        case search.REMOVE_CACHE_RESERVATION_CARD:
            console.log("handling remove reservation card");
            console.log(action.payload);
            const { id } = action.payload;
            index = cardInfo.findIndex(card =>
                card.from === searchInfo.from && card.to === searchInfo.to);

            if (index === -1) {
                return { ...state }
            }

            // expire
            if (isExpire(cardInfo[index].ttl)) {
                // renew ttl
                cardInfo[index].ttl = createTtl(DEFAULT_TTL);
            }

            cardInfo[index].items = cardInfo[index].items.filter(card => card.id !== id);

            localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
            // _cardInfo = [...cardInfo];
            return {
                ...state,
                // cardInfo: _cardInfo
            }

        case card.CREATE_RESERVATION_CARD:
        case payment.CREATE_PAYMENT:
            console.log("handling create card");
            console.log(action.payload);
            index = cardInfo.findIndex(card =>
                card.from === searchInfo.from && card.to === searchInfo.to);

            if (index === -1) {
                return { ...state };
            }

            cardInfo.splice(index);
            localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
            localStorage.removeItem("searchInfo");

            // _cardInfo = [...cardInfo];
            _searchInfo = createDefaultCardInfo();
            localStorage.setItem("searchInfo", JSON.stringify(_searchInfo));

            return {
                ...state,
                searchInfo: _searchInfo,
                // cardInfo: _cardInfo
            }
        default:
            return { ...state }
    }
}

export { searchInitialState };
export default searchReducer;