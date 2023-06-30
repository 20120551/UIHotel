import { invoice } from '@constant';
import { compareDate, getVietnameseDate, substractDate } from '@utls/date';

const invoiceInitialState = {
    invoices: [],
    invoice: {
        hotelServices: [],
        reservationCards: [],
        from: '',
        to: ''
    }
}

function getMinMaxDate(cards) {
    let min = cards?.length ? cards[0].arrivalDate : getVietnameseDate();
    let max = '01/01/1970';

    for (let card of cards) {
        const { arrivalDate, departureDate } = card;
        console.log(min, arrivalDate);
        if (compareDate(min, arrivalDate) > 0) {
            min = arrivalDate;
        }

        if (compareDate(max, departureDate) < 0) {
            max = departureDate;
        }
    }

    return { min, max };
}
const invoiceReducer = (state, action) => {
    switch (action.type) {
        case invoice.GET_ALL_INVOICE:
            console.log(action.payload.invoices);
            console.log("handling get all invoice event");
            return {
                ...state,
                invoices: action.payload.invoices
            }
        case invoice.GET_INVOICE:
            console.log(action.payload.invoice);
            console.log("handling get all invoice event");
            const { reservationCards } = action.payload.invoice;
            const { min, max } = getMinMaxDate(reservationCards);
            return {
                ...state,
                invoice: {
                    ...action.payload.invoice,
                    from: min,
                    to: max
                }
            }
        case invoice.ADD_RESERVATION_CARD:
            console.log(action.payload.cards);
            console.log("handling add reservation card event");
            const index = state.invoice.reservationCards.findIndex(card =>
                (card.id === action.payload.cards[0].id && action.payload.cards[0].departureDate === getVietnameseDate()))

            if (index !== -1) {
                state.invoice.reservationCards[index].departureDate = getVietnameseDate();
                state.invocie.reservationCards.push(action.payload.cards[1]);
            } else {
                state.invoice.reservationCards.push(action.payload.cards[0]);
                const index = state.invoice.reservationCards.findIndex(card =>
                    (card.id === action.payload.cards[1].id && action.payload.cards[1].departureDate === getVietnameseDate()))

                state.invoice.reservationCards[index].departureDate = getVietnameseDate();
            }
            return {
                ...state,
            }
        case invoice.ADD_HOTEL_SERVICE:
            console.log("handling add hotel service");
            console.log(action.payload.services);
            return {
                ...state,
                invoice: {
                    ...state.invoice,
                    hotelServices: action.payload.services
                }
            }
        case invoice.UPDATE_INVOICE_STATUS:
            console.log("handling get update invoice status");
            console.log(action.payload.invoice);
            return {
                ...state,
                invoice: action.payload.invoice
            }
        default:
            return { ...state }
    }
}

export { invoiceInitialState };
export default invoiceReducer;