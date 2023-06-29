import { reservationService } from "@services/index";
import MayEmpty from "@components/mayEmpty";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker';
import $ from 'jquery';
import InvoiceStatus from "@components/invoice/invoiceStatus";
import { createNotification } from "@utls/notification";

export default function Reservation() {
    const [page, setPage] = useState(1);
    const [entries, setEntries] = useState(8);
    const [totalPage, setTotalPage] = useState(1);
    const [invoiceId, setInvoiceId] = useState('');
    const [cardId, setCardId] = useState('');
    const [reservationCards, setReservationCards] = useState();
    const [isEmpty, setIsEmpty] = useState(true);
    const [isSearching, setIsSeaching] = useState(false);
    const navigate = useNavigate();
    const inputTimeRef = useRef();
    // const isEmpty = reservationCards.length === 0 ? true : false;

    // // const handleSearch = function () {
    // //     navigate(`/invoice/${search}`);
    // // }
    const HandleSeachByInvoiceId = (id) => {
        setIsSeaching(true);
        inputTimeRef.current.value = '';
        reservationService.getByInvoiceId(id)
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
                setIsEmpty(true);
            })
    }

    useEffect(() => {
        $(inputTimeRef.current).daterangepicker({
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });
    }, []);

    const HandleDetail = function (id) {
        navigate(`/hotel/reservation/${id}`);
    }

    const HandleSeachByCardId = (id) => {
        setIsSeaching(true);
        reservationService.getByReservationCardId(id)
            .then(card => {
                setReservationCards([card]);
                setIsEmpty(false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
                setIsEmpty(true);
            })
    }

    const HandleSeachByPeriodTime = () => {
        setIsSeaching(true);
        //console.log(inputTimeRef.current.value);
        const timeList = inputTimeRef.current.value.split(" - ");
        if (timeList.length != 2) {
            setIsEmpty(true);
            return;
        }
        reservationService.getByReservationByPeriodTime({ from: timeList[0], to: timeList[1] })
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
                setIsEmpty(true);
            })
    }

    const HandleDeleteReservationCard = (id) => {
        reservationService.deleteReservationCard({ cardId: id });
        setReservationCards(reservationCards.filter(c => c.id !== id));
    }

    const HandleEditReservationCard = (id) => {
        navigate(`/hotel/reservation/edit/${id}`);
    }

    const HandleAddReservation = () => {
        navigate(`/hotel/reservation/booking`);
    }

    const handleLinkClick = () => {
        navigate('/hotel/reservation/booking');
    };

    const HandleReloadPage = () => {
        reservationService.getAll({ page: page, entries: entries })
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })

        reservationService.getTotalPage({ page: page, entries: entries })
            .then(page => {
                setTotalPage(page);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
        setIsSeaching(false);
    }

    useEffect(() => {
        reservationService.getAll({ page: page, entries: entries })
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })

        reservationService.getTotalPage({ page: page, entries: entries })
            .then(page => {
                setTotalPage(page);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, [page, entries])

    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="mt-5">
                            <h4 className="card-title float-left mt-2">Reservation cards
                                <button className="btn btn-link text-success text-left px-3" onClick={(e) => { HandleReloadPage() }}>
                                    cards list
                                </button>
                            </h4>
                            {/* <a onClick={(e) => { HandleAddReservation() }} className="btn btn-primary float-right veiwbutton ">Add
                                Booking</a> */}
                            <button to="/hotel/reservation/booking" className="btn btn-primary float-right veiwbutton" onClick={handleLinkClick}>Add
                                Booking</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-table">
                        <div className="card-body booking_card">
                            <div className="table-responsive">
                                <div className="mb-3 d-flex justify-content-between col-lg-8">
                                    <div className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="number" placeholder="Invoice ID"
                                            aria-label="Search" onChange={(e) => setInvoiceId(e.target.value)} />
                                        <button className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="button" onClick={() => HandleSeachByInvoiceId(invoiceId)}>&#x1F50E;</button>
                                    </div>
                                    <div className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="number"
                                            onChange={(e) => setCardId(e.target.value)}
                                            placeholder="Reservation ID" aria-label="Search" />
                                        <button className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="button" onClick={() => HandleSeachByCardId(cardId)}>&#x1F50E;</button>
                                    </div>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input type="text" name="DateRangePickerReservationCard"
                                            className="form-control mr-sm-2" ref={inputTimeRef} />
                                        <button className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="button" onClick={() => HandleSeachByPeriodTime()}>&#x1F50E;</button>
                                    </form>
                                </div>

                                <table className="datatable table table-stripped table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Reservation ID</th>
                                            <th>Invoice ID</th>
                                            <th>Room ID</th>
                                            <th>Name</th>
                                            <th>Guests number</th>
                                            <th>Arrival Date</th>
                                            <th>Depature Date</th>
                                            <th>Detail</th>
                                            <th>Status</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <MayEmpty isEmpty={isEmpty} name="reservation cards">
                                        <tbody>
                                            {reservationCards && reservationCards.map((card) => {
                                                const { id, invoiceId, guestName, roomId, guestsNumber, arrivalDate, departureDate, notes, status } = card;
                                                return (
                                                    <tr>
                                                        <td>{id}</td>
                                                        <td><Link className="text-success" to={`/hotel/invoice/${invoiceId}`}>{invoiceId}</Link></td>
                                                        <td>{roomId}</td>
                                                        <td>{guestName}</td>
                                                        <td>{guestsNumber}</td>
                                                        <td>{arrivalDate}</td>
                                                        <td>{departureDate}</td>
                                                        <td>
                                                            <button className="btn btn-link text-success text-left p-0" onClick={(e) => { HandleDetail(id) }}>
                                                                Details
                                                            </button>
                                                        </td>
                                                        <td><InvoiceStatus status={status} /></td>
                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action"> <a href="#"
                                                                className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                aria-expanded="false"><i
                                                                    className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item"
                                                                        onClick={() => { HandleEditReservationCard(id) }}>
                                                                        <i className="fas fa-pencil-alt m-r-5"></i>
                                                                        Edit
                                                                    </a>
                                                                    <a className="dropdown-item"
                                                                        onClick={() => { HandleDeleteReservationCard(id) }}>
                                                                        <i className="fas fa-trash-alt m-r-5" ></i>
                                                                        Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </MayEmpty>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <div id="delete_asset" className="modal fade delete-modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center"> <img src="assets/img/sent.png" alt="" width="50"
                            height="46" />
                            <h3 className="delete_class">Are you sure want to delete this Asset?</h3>
                            <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {isSearching ? <></> :
                <nav aria-label="Page navigation" className="mt-3 float-right">
                    <ul className="pagination">
                        <li
                            className="page-item page-link"
                            onClick={() => setPage(page == 1 ? page : page - 1)}>Previous</li>
                        <li
                            className="page-item page-link">{page}/{totalPage}</li>
                        <li
                            className="page-item page-link"
                            onClick={() => {
                                if (page == totalPage) {
                                    setPage(page);
                                }
                                else {
                                    setPage(page + 1)
                                }
                            }}>Next</li>
                    </ul>
                </nav>
            }
        </>
    );
}