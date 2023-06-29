import { reservationService, roomDetailService, roomService, invoiceService } from "../../services";
import MayEmpty from "@components/mayEmpty";
import { createNotification } from "@utls/notification";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function DetailReservation() {
    const [isEmpty, setIsEmpty] = useState(true);
    const [card, setReservationCard] = useState(({
        id: -1,
        invoiceId: -1,
        guestName: "",
        roomId: -1,
        guestsNumber: -1,
        roomType: "",
        notes: "",
    }));
    const { id } = useParams();
    const navigate = useNavigate();

    const HandleEditReservationCard = (id) => {
        navigate(`/hotel/reservation/edit/${id}`);
    }

    useEffect(() => {
        reservationService.getByReservationCardId(id)
            .then(card => {
                setReservationCard(card);
                setIsEmpty(false);
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
                setIsEmpty(true);
            })
    }, [])

    return (
        <>
            <div className="row mt-4">
                {
                    <MayEmpty isEmpty={isEmpty} name="Reservation card">
                        <div className="col-lg-8">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h3 className="page-title mt-3">Reservation id {card.id} -
                                            <Link className="text-success" to={`/hotel/invoice/${card.invoiceId}`}> Invoice id {card.invoiceId}</Link>  -
                                            Guests infomation
                                            <button className="btn btn-link text-success text-left px-3" onClick={(e) => { HandleEditReservationCard(id) }}>
                                                Edit
                                            </button>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 border mb-3"></div>
                                <div className="col-lg-12">
                                    <form>
                                        <div className="row formtype">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Room ID</label>
                                                    <input className="form-control font-weight-bold" type="text" value={card.roomId + " - " + card.roomType} disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Total Members</label>
                                                    <div className="form-control" id="sel3" name="sellist1">
                                                        {card.guestsNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Notes</label>
                                                    <textarea className="form-control" rows="5" id="comment" name="text" value={card.notes}
                                                        onChange={(e) => { card.notes = e.target.value }}></textarea>
                                                </div>
                                            </div>

                                            {Array.from({ length: card.guestsNumber }, (_, index) => (
                                                <>
                                                    <h4 className="col-md-12 mb-3">Guest number {index + 1}</h4>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Full Name</label>
                                                            <input type="text" className="form-control" value={card.guests[index].name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Phone number</label>
                                                            <input type="text" className="form-control" value={card.guests[index].telephoneNumber} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Identity card</label>
                                                            <input type="text" className="form-control" value={card.guests[index].personIdentification} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Address</label>
                                                            <input type="text" className="form-control" value={card.guests[index].address} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Type of guest</label>
                                                            <div className="form-control" id="sel3" name="sellist2">
                                                                {card.guests[index].type}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </MayEmpty>
                }
            </div>

        </>
    );
}