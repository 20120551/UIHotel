import { reservationService } from "@services/index";
import MayEmpty from "@components/mayEmpty";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
    const [page, setPage] = useState(1);
    const [entries, setEntries] = useState(2);
    const [totalPage, setTotalPage] = useState();
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
        setCardId('');
        reservationService.getByInvoiceId(id)
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(() => {
                setIsEmpty(true);
            })
    }

    const HandleSeachByCardId = (id) => {
        setIsSeaching(true);
        setInvoiceId('');
        reservationService.getByReservationCardId(id)
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(() => {
                setIsEmpty(true);
            })
    }

    const HandleSeachByPeriodTime = () => {
        setIsSeaching(true);
        setCardId('');
        setInvoiceId('');
        console.log(inputTimeRef.current.value);
        const timeList = inputTimeRef.current.value.split(" - ");
        if (timeList.length != 2)
        {
            setIsEmpty(true);
            return;
        }
        reservationService.getByReservationByPeriodTime({from: timeList[0], to: timeList[1]})
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })
            .catch(() => {
                setIsEmpty(true);
            })
    }

    useEffect(() => {
        reservationService.getAll({ page: page, entries: entries })
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })

        reservationService.getTotalPage({ page: page, entries: entries })
            .then(page => {
                setTotalPage(page);
        })
    }, [page, entries])

    return (
        <>
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="mt-5">
                            <h4 className="card-title float-left mt-2">Reservation cards</h4>
                            <a href="add-booking.html" className="btn btn-primary float-right veiwbutton ">Add
                                Booking</a>
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
                                            className="form-control mr-sm-2" ref={inputTimeRef}/>
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
                                            <th>Notes</th>
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
                                                        <td>{invoiceId}</td>
                                                        <td>{guestName}</td>
                                                        <td>{roomId}</td>
                                                        <td>{guestsNumber}</td>
                                                        <td>{arrivalDate}</td>
                                                        <td>{departureDate}</td>
                                                        <td>{notes}</td>
                                                        <td>{status}</td>
                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action"> <a href="#"
                                                                className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                aria-expanded="false"><i
                                                                    className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-booking.html">
                                                                        <i className="fas fa-pencil-alt m-r-5"></i>
                                                                        Edit
                                                                    </a>
                                                                    <a className="dropdown-item" href="add-ChangeRoom.html">
                                                                        <i className="fas fa-pencil-alt m-r-5"></i>
                                                                        Change room
                                                                    </a>
                                                                    <a className="dropdown-item" href="#" data-toggle="modal"
                                                                        data-target="#delete_asset">
                                                                        <i className="fas fa-trash-alt m-r-5"></i>
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
            <div id="delete_asset" className="modal fade delete-modal" role="dialog">
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
            </div>
            {isSearching ? <></> :
                <nav aria-label="Page navigation" className="mt-3 float-right">
                    <ul className="pagination">
                        <li
                            className="page-item page-link"
                            onClick={() => setPage(page == 1 ? page : page - 1)}>Previous</li>
                        <li
                            className="page-item page-link">{page}</li>
                        <li
                            className="page-item page-link"
                            onClick={() => {
                                if (page == totalPage){
                                    setPage(page);
                                }
                                else{
                                    setPage(page + 1)
                                }
                            }}>Next</li>
                    </ul>
                </nav>
            }
        </>
    );
}