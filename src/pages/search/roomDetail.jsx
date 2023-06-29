import PayInfo from "@components/search/payInfo";
import { useRoom, useSearch } from "@hooks/context-hooks";
import { revenueService, roomService } from "@services/index";
import { room, search } from "@store/actions";
import { createNotification } from "@utls/notification";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function RoomDetail() {
    const { id } = useParams();
    const [state, dispatch] = useRoom();
    const [searchState, searchDispatch] = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        roomService.getRoomDetail({ id })
            .then(data => {
                dispatch(room.getRoomDetail({ room: data }))
            }).catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, []);

    const handleBooking = function (room) {
        const { detail, ...payload } = room;
        searchDispatch(search.cacheCard({
            ...detail,
            ...payload,
            type: searchState.searchInfo.type
        }))
    }
    const handleBookingRemove = function (payload) {
        searchDispatch(search.removeCard(payload));
    }

    const handleCreateCard = function () {
        navigate("/payment");
    }


    return (
        <div className="mt-4">
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Our Rooms</h2>
                                <div className="bt-option">
                                    <Link to="/search">Search</Link>
                                    <span>Rooms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="room-details-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-8 col-md-8">
                            <div className="room-details-item">
                                <img src={state.room.detail?.image || "/assets/img/room/room-details.jpg"} alt="" />
                                <div className="rd-text">
                                    <div className="rd-title">
                                        <h3>Room {state.room.id}</h3>
                                        <div className="rdt-right">
                                            <div className="rating">
                                                <i className="icon_star"></i>
                                                <i className="icon_star"></i>
                                                <i className="icon_star"></i>
                                                <i className="icon_star"></i>
                                                <i className="icon_star-half_alt"></i>
                                            </div>
                                            <button
                                                onClick={() => handleBooking(state.room)}
                                                className="btn btn-info">Booking Now</button>
                                        </div>
                                    </div>
                                    <h2>{parseFloat(state.room.detail?.price).toLocaleString('en')} VND <span>/ night</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="r-o">Status:</td>
                                                <td>{state.room.status}</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Room Type:</td>
                                                <td>{state.room.detail?.roomType}</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Default Guest:</td>
                                                <td>Default persion {state.room.detail?.roomRegulation?.defaultGuest}</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Max Guest:</td>
                                                <td>Max persion {state.room.detail?.roomRegulation?.maxGuest}</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Description:</td>
                                                <td>{state.room.detail?.description}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className="f-para">
                                        {state.room.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-4">

                            <PayInfo
                                searchInfo={searchState.searchInfo}
                                cardInfo={
                                    searchState.cardInfo.find(
                                        card => (
                                            card.from === searchState.searchInfo.from && card.to === searchState.searchInfo.to
                                        ))?.items}
                                handleBookingRemove={handleBookingRemove}
                                handleCreateCard={handleCreateCard}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}