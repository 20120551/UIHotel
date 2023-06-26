import PayInfo from "@components/search/payInfo";
import { useRoom, useSearch } from "@hooks/context-hooks";
import { roomService } from "@services/index";
import { room, search } from "@store/actions";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function RoomDetail() {
    const { id } = useParams();
    const [state, dispatch] = useRoom();
    const [searchState, searchDispatch] = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        roomService.getRoomDetail({ id })
            .then(data => dispatch(room.getRoomDetail({ room: data })));
    }, []);

    const handleBooking = function (room) {
        searchDispatch(search.cacheCard({
            ...room,
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
                                    <Link to="/">Home</Link>
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
                                <img src="img/room/room-details.jpg" alt="" />
                                <div className="rd-text">
                                    <div className="rd-title">
                                        <h3>Premium King Room</h3>
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
                                    <h2>159$<span>/Pernight</span></h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="r-o">Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Capacity:</td>
                                                <td>Max persion 5</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className="f-para">

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
                                            card.from === (searchState.searchInfo.from
                                                && card.to === searchState.searchInfo.to)
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