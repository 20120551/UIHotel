import ChangeRoom from "@components/invoice/changeRoom";
import ChangeService from "@components/invoice/changeService";
import InvoiceStatus from "@components/invoice/invoiceStatus";
import PaymentDetail from "@components/invoice/paymentDetail";
import MayEmpty from "@components/mayEmpty";
import { useInvoice } from "@hooks/context-hooks";
import { invoiceService } from "@services";
import { invoice } from "@store/actions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InvoiceDetail() {
    const [roomChanged, setRoomchanged] = useState({
        oldRoom: '',
        isActiveRoomChange: false,
        isActiveServiceChange: false
    });
    const [logs, setLogs] = useState([]);


    const navigate = useNavigate();
    const [state, dispatch] = useInvoice();
    const isEmptyCard = state.invoice.reservationCards ?
        (state.invoice.reservationCards.length === 0 ? true : false) : true;
    const isEmptyService = state.invoice.hotelServices ?
        (state.invoice.hotelServices.length === 0 ? true : false) : true;

    const { id } = useParams();

    useEffect(() => {
        invoiceService.getDetail({ index: id })
            .then(data => {
                dispatch(invoice.getInvoice({ invoice: data }));
            })
            .catch(err => {
                console.log('error', err);
                setTimeout(() => {
                    navigate("/hotel/invoice")
                }, 1000);
            })
    }, []);

    const handlePayInvoice = function () {
        invoiceService.updateInvoiceStatus({ invoiceId: id })
            .then(data => {
                dispatch(invoice.updateInvoiceStatus({ invoice: data }));
            })
    }

    const handleChangeRoom = function ({ from, to, oldRoom, newRoom }) {
        setRoomchanged(prev => ({
            ...prev,
            isActiveRoomChange: false
        }))
        invoiceService.addReservationCard({
            invoiceId: id,
            oldRoomId: oldRoom,
            newRoomId: newRoom,
            fromDateStr: from,
            toDateStr: to
        })
            .then(_ => {
                // dispatch(invoice.addReservationCard({ cards: data }));
                return invoiceService.getDetail({ index: id })
            })
            .then(data => {
                dispatch(invoice.getInvoice({ invoice: data }));
            })
    }

    const handleChangeService = function ({ id: serviceId }) {
        setRoomchanged(prev => ({
            ...prev,
            isActiveServiceChange: false
        }))
        invoiceService.addHotelService({ invoiceId: id, serviceId })
            .then(_ => {
                // dispatch(invoice.addHotelService({ services: data.hotelServices }));
                return invoiceService.getDetail({ index: id })
            })
            .then(data => {
                dispatch(invoice.getInvoice({ invoice: data }));
            })
    }
    const getPaymentDetail = function () {
        invoiceService.getPayDetail({ index: id })
            .then(data => {
                setLogs(_ => (data.detail))
            })
    }

    return (
        <div className="row flex flex-column">
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col-11">
                        <div className="mt-5">
                            <h3 className="card-title float-left mt-2">
                                Invoice {state.invoice.id}
                                <InvoiceStatus status={state.invoice.status} />
                            </h3>
                        </div>
                    </div>
                    <div className="col-1 mt-5">
                        <button
                            data-toggle="modal" data-target="#exampleModal1"
                            onClick={() => { getPaymentDetail() }}
                            className="btn btn-primary">Detail</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 col-md-8">
                    <div className="card-body">
                        <h4 className="mb-4">Reservation Card</h4>
                        <ul className="nav nav-tabs nav-tabs-solid">
                            <li className="nav-item"><a
                                onClick={() => setRoomchanged(prev => ({ ...prev, isActiveRoomChange: false }))}
                                className={!roomChanged.isActiveRoomChange ? "nav-link active" : "nav-link"}
                                href="#solid-tab1"
                                data-toggle="tab">Card</a></li>
                            <li className="nav-item"><a
                                onClick={() => setRoomchanged(prev => ({ ...prev, isActiveRoomChange: true }))}
                                className={roomChanged.isActiveRoomChange ? "nav-link active" : "nav-link"}
                                href="#solid-tab2" data-toggle="tab">Change</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                className={!roomChanged.isActiveRoomChange ? "tab-pane show active" : "tab-pane show"}
                                id="solid-tab1">
                                <div className="table-responsive">
                                    <MayEmpty isEmpty={isEmptyCard} name="reservation card">
                                        <table className="table-stripped table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Room</th>
                                                    <th>Arrival Date</th>
                                                    <th>Departure Date</th>
                                                    <th>Price</th>
                                                    <th>
                                                        Change
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {state.invoice.reservationCards?.map((card, index) => {
                                                    const { id, price, arrivalDate, departureDate, roomId } = card;
                                                    return (
                                                        <tr
                                                            onClick={() => navigate(`/hotel/reservation/edit/${id}`)}
                                                            key={id}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>{roomId}</td>
                                                            <td>{arrivalDate}</td>
                                                            <td>{departureDate}</td>
                                                            <td>${price}</td>
                                                            <td>
                                                                <button
                                                                    onClick={() => setRoomchanged(prev => ({
                                                                        ...prev,
                                                                        oldRoom: roomId,
                                                                        isActiveRoomChange: true
                                                                    }))}
                                                                    className="btn btn-info">Change</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </MayEmpty>
                                </div>
                            </div>
                            <div
                                className={roomChanged.isActiveRoomChange ? "tab-pane active" : "tab-pane"}
                                id="solid-tab2">
                                <ChangeRoom oldRoom={roomChanged.oldRoom} handleChangeRoom={handleChangeRoom} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h4 className="mb-4">Hotel Service</h4>
                        <ul className="nav nav-tabs nav-tabs-solid">
                            <li className="nav-item"><a
                                onClick={() => setRoomchanged(prev => ({ ...prev, isActiveServiceChange: false }))}
                                className={!roomChanged.isActiveServiceChange ? "nav-link active" : "nav-link"}
                                href="#solid-tab3"
                                data-toggle="tab">Service</a></li>
                            <li className="nav-item"><a
                                onClick={() => setRoomchanged(prev => ({ ...prev, isActiveServiceChange: true }))}
                                className={roomChanged.isActiveServiceChange ? "nav-link active" : "nav-link"}
                                href="#solid-tab4" data-toggle="tab">Add</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                className={!roomChanged.isActiveServiceChange ? "tab-pane show active" : "tab-pane show"}
                                id="solid-tab3">
                                <div className="table-responsive">
                                    <MayEmpty name="hotel service" isEmpty={isEmptyService}>
                                        <table className="table-stripped table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Card</th>
                                                    <th>Name</th>
                                                    <th>Create On</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {state.invoice.hotelServices?.map((service, index) => {
                                                    const { id, price, createOn, name } = service;
                                                    return (
                                                        <tr key={id}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>{id}</td>
                                                            <td>{name}</td>
                                                            <td>{createOn}</td>
                                                            <td>${price}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </MayEmpty>
                                </div>
                            </div>
                            <div
                                className={roomChanged.isActiveServiceChange ? "tab-pane active" : "tab-pane"}
                                id="solid-tab4">

                                <ChangeService handleChangeService={handleChangeService} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md-4">
                    <div className="bg-white p-2">
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title mt-5">Guests Booking</h3>
                                </div>
                            </div>
                        </div>
                        <div className="border my-3"></div>
                        <div>Time of stay</div>
                        <div><b>22/05/2023 - 23/05/2023</b></div>
                        <div className="border my-3"></div>
                        <div className="my-3">Price Details</div>

                        <div style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "420px" }}>
                            {state.invoice.hotelServices?.map((service, index) => {
                                const { id, price, createOn, name } = service;
                                return (
                                    <div key={id}>
                                        <div className="mb-2">
                                            <b>Service{index + 1}: S-{id}</b> | {name}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            Price<b>{price} VND</b>
                                        </div>
                                    </div>
                                )
                            })}

                            {state.invoice.reservationCards?.map((card, index) => {
                                const { id, price, roomType } = card;
                                return (
                                    <div key={id}>
                                        <div className="mb-2">
                                            <b>Room {index + 1}: G{id}</b> | {roomType}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            Price <b>{price} VND</b>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="border my-3"></div>
                        <div className="d-flex justify-content-between">
                            <div>Total</div>
                            <h5>{state.invoice.totalSum} VND</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Has Paid</div>
                            <h5>{state.invoice.downPayment} VND</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Charge</div>
                            <h5 className="font-weight-bold">{state.invoice.totalSum - state.invoice.downPayment} VND</h5>
                        </div>
                        <button
                            onClick={handlePayInvoice}
                            className="btn btn-primary btn-block my-3">Pay</button>
                    </div>
                </div>
            </div>
            <PaymentDetail logs={logs} />
        </div >
    );
}