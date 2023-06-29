import { reservationService, roomDetailService, roomService, invoiceService } from "../../services";
import MayEmpty from "@components/mayEmpty";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker';
import moment from "moment";
import $ from 'jquery';
import { createNotification } from "@utls/notification";

export default function Reservation() {
    const [roomDetail, setRoomDetail] = useState();
    const [curListRoomsDisplay, setCurListRoomsDisplay] = useState();
    const [curSelectedRooms, setCurSelectedRooms] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [invoiceId, setInvoiceId] = useState(-1);
    const [nameCus, setNameCus] = useState('');
    const [email, setEmail] = useState('');
    const [downPayment, setDownPayment] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isGuestInfoShow, setGuestInfoShow] = useState(false);
    const navigate = useNavigate();
    const inputTimeRef = useRef();

    useEffect(() => {
        $(inputTimeRef.current).daterangepicker({
            minDate: moment().startOf('day'),
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });
    }, []);

    const HandleGetListFreeRoomsByTime = (type) => {
        if (from == '' && to == '') {
            return;
        }
        roomService.getFreeRooms({ type: type, from: from, to: to })
            .then(rooms => {
                setIsEmpty(rooms.length === 0 ? true : false);
                setCurListRoomsDisplay(rooms);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
                setIsEmpty(true);
            })
    }

    const HandleSeachByPeriodTime = () => {
        //console.log(inputTimeRef.current.value);
        const timeList = inputTimeRef.current.value.split(" - ");
        if (timeList.length != 2) {
            setIsEmpty(true);
            return;
        }
        setFrom(timeList[0]);
        setTo(timeList[1]);
        setCurSelectedRooms([]);
        setTotalAmount(0);
    }

    const HandleSelectedRoom = (room) => {
        if (curSelectedRooms.some(r => r.id === room.id)) {
            return;
        }
        setCurSelectedRooms(prev => [...prev, room]);

        const fromParts = from.split('/');
        const toParts = to.split('/');
        const fromFormatted = `${fromParts[1]}/${fromParts[0]}/${fromParts[2]}`;
        const toFormatted = `${toParts[1]}/${toParts[0]}/${toParts[2]}`;
        const date1 = new Date(fromFormatted);
        const date2 = new Date(toFormatted);
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        setTotalAmount(totalAmount + room.price * days);
    }

    const HandleRemoveSelectedRoom = (room) => {
        let newSelectedRooms = curSelectedRooms.filter(r => r.id !== room.id);
        setCurSelectedRooms(newSelectedRooms);

        const fromParts = from.split('/');
        const toParts = to.split('/');
        const fromFormatted = `${fromParts[1]}/${fromParts[0]}/${fromParts[2]}`;
        const toFormatted = `${toParts[1]}/${toParts[0]}/${toParts[2]}`;
        const date1 = new Date(fromFormatted);
        const date2 = new Date(toFormatted);
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        setTotalAmount(totalAmount - room.price * days);

        if (newSelectedRooms.length == 0 && isGuestInfoShow) {
            invoiceService.deleteInvoice(({ invoiceId: invoiceId }));
            window.location.reload();
        }
    }


    const HandleOnNextButton = () => {
        if (curSelectedRooms.length > 0) {
            reservationService.createReservation(({
                arrivalDateStr: from,
                departureDateStr: to,
                reservationCards: curSelectedRooms.map(room => ({
                    RoomId: room.id,
                    Notes: null,
                    Guests: []
                }))
            }))
                .then(res => {
                    setInvoiceId(res.invoiceId);
                })
                .catch(err => {
                    const { message = "", code = err.response?.data } = err.response?.data;
                    createNotification({ type: "error", title: message, message: code });
                })
            setGuestInfoShow(true);
        }
    }

    const HandleOnChangeGuestsNum = () => {
        setCurSelectedRooms(curSelectedRooms.map(room => ({
            ...room,
            guestNumber: room.guestNumber,
            guests: room.guests
        })))
    }

    const HandleOnSubmitCreateReservation = () => {
        if (nameCus != '' && email != '') {
            reservationService.confirmReservation(({
                invoiceId: invoiceId,
                email: email,
                totalSum: totalAmount,
                downPayment: downPayment,
                nameCus: nameCus,
                arrivalDateStr: from,
                departureDateStr: to,
                reservationCards: curSelectedRooms.map(room => ({
                    RoomId: room.id,
                    Notes: room.notes,
                    Guests: room.guests
                }))
            }))
                .then(res => {
                    navigate(`/hotel/invoice/${res.id}`);
                })
                .catch(err => {
                    const { message = "", code = err.response?.data } = err.response?.data;
                    createNotification({ type: "error", title: message, message: code });
                })
        }
    }

    const HandleCancleReservation = () => {
        invoiceService.deleteInvoice(({ invoiceId: invoiceId }));
        window.location.reload();
    }

    useEffect(() => {
        setRoomDetail(null)
        setCurListRoomsDisplay()
        roomDetailService.getAll()
            .then(roomDetails => {
                setRoomDetail(roomDetails);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, [from, to])

    return (
        <>
            <div className="row mt-4">
                {
                    !isGuestInfoShow ?
                        <div className="col-lg-8 py-1">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="col d-flex align-items-center">
                                                <h3 className="page-title">Add Booking</h3>
                                                <form className="form-inline px-5">
                                                    <input type="text" name="DateRangePicker"
                                                        className="form-control mr-sm-2" ref={inputTimeRef} />
                                                    <button className="btn btn-outline-secondary my-2 my-sm-0"
                                                        type="button" onClick={() => HandleSeachByPeriodTime()}>&#x1F50E;</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <ul className="nav nav-tabs nav-tabs-solid">
                                                {
                                                    roomDetail && roomDetail.map((rd) => {
                                                        return (
                                                            <li className="nav-item"><a className="nav-link" onClick={() => { HandleGetListFreeRoomsByTime(rd.roomType) }}
                                                                data-toggle="tab">{rd.roomType} Room</a></li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane show active" id="solid-tab1">
                                                    {/* <div className="mb-3 d-flex justify-content-between col-lg-4 p-0">
                                                <form className="form-inline my-2 my-lg-0">
                                                    <input type="text" name="DateRangePickerReservationCard"
                                                        className="form-control mr-sm-2" ref={inputTimeRef} />
                                                    <button className="btn btn-outline-secondary my-2 my-sm-0"
                                                        type="button" onClick={() => HandleSeachByPeriodTime()}>&#x1F50E;</button>
                                                </form>
                                            </div> */}
                                                    <div className="table-responsive">
                                                        <table
                                                            className="datatable table table-stripped table table-hover table-center mb-0">

                                                            <thead>
                                                                <tr>
                                                                    <th>Room ID</th>
                                                                    <th>Description</th>
                                                                    <th>Default Guests</th>
                                                                    <th>Maximum Guests</th>
                                                                    <th>From</th>
                                                                    <th className="text-right">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody style={{ overflowX: "hidden", overflowY: "scroll", maxHeight: "500px" }}>
                                                                <MayEmpty isEmpty={isEmpty} name="No free rooms. Rooms list">
                                                                    {
                                                                        curListRoomsDisplay && curListRoomsDisplay.map((room) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{room.id}</td>
                                                                                    <td>&#128719; {room.description}</td>
                                                                                    <td><div >{room.defaultGuest}</div></td>
                                                                                    <td><div >{room.maxGuest}</div></td>
                                                                                    <td><b>{room.price}</b> VND / night</td>
                                                                                    <td className="text-right">
                                                                                        <button type="button" className="btn btn-primary"
                                                                                            onClick={() => { HandleSelectedRoom(room) }}>
                                                                                            Select
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </MayEmpty>
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
                        :
                        <div className="col-lg-8">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h3 className="page-title mt-5">Add Booking - Guests infomation</h3>
                                        <div className="btn btn-outline-danger" type="button" onClick={() => { HandleCancleReservation() }}>cancle</div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4">
                                        <label>Customer name</label>
                                        <input className="form-control font-weight-bold" type="text"
                                            onChange={(e) => { setNameCus(e.target.value) }} required />
                                    </div>
                                    <div className="col-4">
                                        <label>Customer email</label>
                                        <input className="form-control font-weight-bold" type="text"
                                            onChange={(e) => { setEmail(e.target.value) }} required />
                                    </div>

                                    <div className="col-4">
                                        <label>Down payment</label>
                                        <input className="form-control font-weight-bold" type="number"
                                            onChange={(e) => { setDownPayment(e.target.value) }} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {curSelectedRooms && curSelectedRooms.map((room) => {
                                    return (
                                        <>
                                            <div className="col-lg-12 border mb-3"></div>
                                            <div className="col-lg-12">
                                                <form>
                                                    <div className="row formtype">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Room ID</label>
                                                                <input className="form-control font-weight-bold" type="text" value={room.id} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Total Members</label>
                                                                <select className="form-control" id="sel3" name="sellist1" onChange={(e) => {
                                                                    room["guestNumber"] = e.target.value;
                                                                    room["notes"] = "";
                                                                    room["guests"] = Array.from({ length: room.guestNumber }, (_, index) => ({
                                                                        name: "",
                                                                        telephoneNumber: "",
                                                                        address: "",
                                                                        type: "domestic guest",
                                                                        personIdentification: ""
                                                                    }));
                                                                    HandleOnChangeGuestsNum();
                                                                }}>
                                                                    <option>Select</option>
                                                                    {
                                                                        Array.from({ length: room.maxGuest }, (_, index) => (
                                                                            <option key={index}>{index + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Notes</label>
                                                                <textarea className="form-control" rows="5" id="comment" name="text"
                                                                    onChange={(e) => { room.notes = e.target.value }}></textarea>
                                                            </div>
                                                        </div>

                                                        {Array.from({ length: room?.guestNumber }, (_, index) => (
                                                            <>
                                                                <h4 className="col-md-12 mb-3">Guest number {index + 1}</h4>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input type="text" className="form-control"
                                                                            onChange={(e) => { room.guests[index].name = e.target.value }} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Phone number</label>
                                                                        <input type="text" className="form-control"
                                                                            onChange={(e) => { room.guests[index].telephoneNumber = e.target.value }} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Identity card</label>
                                                                        <input type="text" className="form-control"
                                                                            onChange={(e) => { room.guests[index].personIdentification = e.target.value }} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Address</label>
                                                                        <input type="text" className="form-control"
                                                                            onChange={(e) => { room.guests[index].address = e.target.value }} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Type of guest</label>
                                                                        <select className="form-control" id="sel3" name="sellist2"
                                                                            onChange={(e) => { room.guests[index].type = e.target.value }}>
                                                                            <option>domestic guest</option>
                                                                            <option>foreigner</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))}


                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-lg-12">
                                                <hr />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                }

                <div className="col-lg-4 py-1">
                    <div className="bg-white col-lg-3" style={{ position: "fixed" }}>
                        <div className="page-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="page-title mt-5">Guests Booking</h3>
                                </div>
                            </div>
                        </div>
                        <div className="border my-3"></div>
                        <div>Time of stay</div>
                        <div><b>{from} - {to}</b></div>
                        <div className="border my-3"></div>
                        <div className="mt-3">Price Details</div>

                        <div style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "420px" }}>
                            {
                                curSelectedRooms && curSelectedRooms.map((room) => {
                                    return (
                                        <>
                                            <hr></hr>
                                            <div>
                                                <div className="mb-2">
                                                    <b>Room: {room.id}</b> | {room.roomType} Room
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <b>{room.price} VND / night</b>
                                                    <button className="btn btn-outline-success" onClick={() => { HandleRemoveSelectedRoom(room) }}>Remove</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="border my-3"></div>
                        <div className="d-flex justify-content-between">
                            <div>Total Amount</div>
                            <h3 className="font-weight-bold">{totalAmount} VND</h3>
                        </div>
                        {
                            isGuestInfoShow
                                ?
                                <div className="btn btn-primary btn-block my-3" onClick={() => { HandleOnSubmitCreateReservation() }}>
                                    submit
                                </div>
                                :
                                <div className="btn btn-primary btn-block my-3" onClick={() => { HandleOnNextButton() }}>
                                    next
                                </div>
                        }
                    </div>
                </div>
            </div>

        </>
    );
}