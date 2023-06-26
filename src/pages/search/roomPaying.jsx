import PayInfo from "@components/search/payInfo";
import { useSearch } from "@hooks/context-hooks";
import { cardService, paymentService } from "@services/index";
import { search } from "@store/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const payMethod = [{
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRX2g_WceO55Wfx_NcaHXidw2VUVa7Ga83oA&usqp=CAU",
    name: "Momo"
}, {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5ChvnCxXEVEDa4ysZwAszOgP0wIr3r75R07fzHNaRdWenc8xWhltiKGNC3wBmkrDFxc&usqp=CAU",
    name: "Stripe"
}, {
    img: "https://play-lh.googleusercontent.com/bDCkDV64ZPT38q44KBEWgicFt2gDHdYPgCHbA3knlieeYpNqbliEqBI90Wr6Tu8YOw",
    name: "Paypal"
}]

export default function RoomPaying() {
    const navigator = useNavigate();
    const [state, dispatch] = useSearch();
    const [timer, setTimer] = useState(0);
    const [guest, setGuest] = useState({
        firstname: '',
        lastname: '',
        email: '',
        payMethod: ''
    });

    const handleBookingRemove = function (payload) {
        dispatch(search.removeCard(payload));
    }

    const handleCreateCard = function () {
        const _useFetch = async function () {
            const { cardInfo, searchInfo } = state;
            const card = cardInfo.find(
                card => card.from === searchInfo.from && card.to === searchInfo.to)?.items || [];

            const { invoiceId } = await cardService.createCard({
                email: guest.email,
                nameCus: guest.firstname + " " + guest.lastname,
                arrivalDateStr: searchInfo.from,
                departureDateStr: searchInfo.to,
                reservationCards: card.map(card => ({ roomId: card.id }))
            })

            const payload = await paymentService.createPayment(invoiceId, { payMethod: guest.payMethod });

            return payload;
        }

        _useFetch()
            .then(payload => {
                let {
                    paymentId,
                    url,
                    expireAt
                } = payload

                console.log(payload);
                // bind url

                // timeout
                let interval1 = setInterval(() => {
                    if (timer < expireAt * 60 * 1000) {
                        setTimer(prev => prev + 1000);
                    } else {
                        clearInterval(interval1);
                        // notify

                        setTimeout(() => {
                            navigator("/");
                        }, 1000 * 5);
                    }
                }, 1000);

                let interval2 = setInterval(() => {
                    paymentService.getPaymentStatus(paymentId)
                        .then(data => {
                            const { isCompleted, timeout } = data;
                            if (isCompleted) {
                                clearInterval(interval2);
                                setTimeout(() => {
                                    clearInterval(interval1);
                                    navigator("/");
                                }, 1000 * timeout);
                            }
                        })
                }, 1000 * 30) // 30s
            })
    }

    return (
        <div className="mt-4">
            <section className="rooms-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Thông tin phòng</h4>
                                </div>
                                <div className="card-body">
                                    <form action="">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Họ</label>
                                                <input
                                                    value={guest.firstname}
                                                    onChange={(e) => setGuest(prev => ({
                                                        ...prev,
                                                        firstname: e.target.value
                                                    }))}
                                                    type="text" className="form-control" placeholder="Họ..." />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Tên</label>
                                                <input
                                                    value={guest.lastname}
                                                    onChange={(e) => setGuest(prev => ({
                                                        ...prev,
                                                        lastname: e.target.value
                                                    }))}
                                                    type="text" className="form-control" placeholder="Tên..." />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <input
                                                    value={guest.email}
                                                    onChange={(e) => setGuest(prev => ({
                                                        ...prev,
                                                        email: e.target.value
                                                    }))}
                                                    type="email" className="form-control" placeholder="email..." />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Xác nhận email</label>
                                                <input type="email" className="form-control" placeholder="email..." />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Payment method</label>
                                            <div className="radio-buttons">
                                                {payMethod.map((method, index) => {
                                                    return (
                                                        <label className="custom-radio" key={index}>
                                                            <input
                                                                onChange={(e) => setGuest(prev => ({
                                                                    ...prev,
                                                                    payMethod: e.target.value
                                                                }))}
                                                                type="radio" name="radio" value={method.name.toLowerCase()} />
                                                            <span className="radio-btn"><i className="las la-check"></i>
                                                                <div className="hobbies-icon">
                                                                    <img src={method.img} />
                                                                    <h3 className="">{method.name}</h3>
                                                                </div>
                                                            </span>
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card mt-4" style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "420px" }}>
                                <div className="card-header">
                                    <h4 className="card-title">Chính sách đặt phòng</h4>
                                </div>
                                <div className="card-body ml-5 mr-5">
                                    <div>
                                        <h4 className="mb-4">Chính sách 1</h4>
                                        <p><b>Hủy:</b> Nếu hủy, thay đổi hoặc không đến, khách sẽ trả toàn bộ giá trị tiền
                                            đặt phòng.</p>
                                        <p><b>Thanh toán:</b> Thanh toán toàn bộ giá trị tiền đặt phòng.</p>
                                        <div className="border my-3"></div>
                                    </div>
                                    <div>
                                        <h4 className="mb-4">Chính sách 1</h4>
                                        <p><b>Hủy:</b> Nếu hủy, thay đổi hoặc không đến, khách sẽ trả toàn bộ giá trị tiền
                                            đặt phòng.</p>
                                        <p><b>Thanh toán:</b> Thanh toán toàn bộ giá trị tiền đặt phòng.</p>
                                        <div className="border my-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <PayInfo
                                searchInfo={state.searchInfo}
                                cardInfo={
                                    state.cardInfo.find(
                                        card => (
                                            card.from === state.searchInfo.from && card.to === state.searchInfo.to
                                        ))?.items}
                                handleBookingRemove={handleBookingRemove}
                                handleCreateCard={handleCreateCard}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}