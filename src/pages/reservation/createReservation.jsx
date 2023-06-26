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


    useEffect(() => {
        reservationService.getAll({ page: page, entries: entries })
            .then(cards => {
                setReservationCards(cards);
                setIsEmpty(cards.length === 0 ? true : false);
            })

    }, [page, entries])

    return (
        <>
            <div className="row mt-4">
                <div class="col-lg-8 py-1">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="col d-flex align-items-center">
                                        <h3 class="page-title">Add Booking</h3>
                                        <form class="form-inline px-5">
                                            <input type="text" name="DateRangePicker" class="form-control mr-sm-2" />
                                            <button class="btn btn-outline-secondary my-2 my-sm-0"
                                                type="submit">&#x1F50E;</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ul class="nav nav-tabs nav-tabs-solid">
                                        <li class="nav-item"><a class="nav-link active" href="#solid-tab1"
                                            data-toggle="tab">Standard Room</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane show active" id="solid-tab1">
                                            <div class="mb-3 d-flex justify-content-between col-lg-4 p-0">
                                                <form class="form-inline my-2 my-lg-0">
                                                    <input class="form-control mr-sm-2" type="search" placeholder="Room ID"
                                                        aria-label="Search" />
                                                    <button class="btn btn-outline-secondary my-2 my-sm-0"
                                                        type="submit">&#x1F50E;</button>
                                                </form>
                                            </div>
                                            <div class="table-responsive">
                                                <table
                                                    class="datatable table table-stripped table table-hover table-center mb-0">

                                                    <thead>
                                                        <tr>
                                                            <th>Room ID</th>
                                                            <th>Description</th>
                                                            <th>Maximum Guests</th>
                                                            <th>Details</th>
                                                            <th>From</th>
                                                            <th class="text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{overflowX: "hidden", overflowY: "scroll",  maxHeight: "500px"}}>
                                                        <tr>
                                                            <td>G-102</td>
                                                            <td>&#128719; single bed </td>
                                                            <td><div class="text-center">3</div></td>
                                                            <td>
                                                                <button class="btn btn-link text-success text-left p-0">
                                                                    Details
                                                                </button>
                                                            </td>
                                                            <td><b>1.247.400 VND</b> / night</td>
                                                            <td class="text-right">
                                                                <button type="button" class="btn btn-primary">Select</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 py-1">
                    <div class="bg-white col-lg-3" style={{ position: "fixed" }}>
                        <div class="page-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="page-title mt-5">Guests Booking</h3>
                                </div>
                            </div>
                        </div>
                        <div class="border my-3"></div>
                        <div>Time of stay</div>
                        <div><b>22/05/2023 - 23/05/2023</b></div>
                        <div class="border my-3"></div>
                        <div class="my-3">Price Details</div>

                        <div style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "420px" }}>
                            <div>
                                <div class="mb-2">
                                    <b>Room 1: G-102</b> | Standard Room
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <b>1.247.400 VND/night</b>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <div class="mb-2">
                                    <b>Room 1: G-102</b> | Standard Room
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <b>1.247.400 VND/night</b>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>
                            <hr></hr>
                            <hr></hr>
                            <div>
                                <div class="mb-2">
                                    <b>Room 2: G-102</b> | Standard Room
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <b>1.247.400 VND/night</b>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <div class="mb-2">
                                    <b>Room 3: G-102</b> | Standard Room
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <b>1.247.400 VND/night</b>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <div class="mb-2">
                                    <b>Room 4: G-102</b> | Standard Room
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <b>1.247.400 VND/night</b>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>
                        </div>
                        <div class="border my-3"></div>
                        <div class="d-flex justify-content-between">
                            <div>Total Amount</div>
                            <h3 class="font-weight-bold">10.000.000 VND</h3>
                        </div>
                        <a class="btn btn-primary btn-block my-3" href="add-booking-info-guests.html" role="button">
                            next
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}