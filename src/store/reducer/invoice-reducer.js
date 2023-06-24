import { invoice } from '@constant';
import { getVietnameseDate } from '@utls/date';

const invoiceInitialState = {
    invoices: [],
    invoice: {
        hotelServices: [],
        reservationCards: []
    }
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
            return {
                ...state,
                invoice: action.payload.invoice
            }
        case invoice.ADD_RESERVATION_CARD:
            console.log(action.payload.cards);
            console.log("handling add reservation card event");
            const cards = state.invoice.reservationCards.map((card) => {
                const { id } = card;
                const _card = action.payload.cards.find(card => {
                    const date = getVietnameseDate();
                    const accepted = date === card.arrivalDate;
                    return id === card.id && (accepted)
                })

                if (_card) {
                    return {
                        ..._card
                    }
                }
                return {
                    ...card
                }
            });

            return {
                ...state,
                invoice: {
                    ...state.invoice,
                    reservationCards: cards
                }
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