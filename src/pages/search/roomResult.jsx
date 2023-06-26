import PayInfo from "@components/search/payInfo";
import Room from "@components/search/room";
import SearchBar from "@components/search/searchBar";
import { useRoom, useSearch } from "@hooks/context-hooks";
import { cardService, roomService } from "@services/index";
import { room, search } from "@store/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomResult() {

    const [state, dispatch] = useSearch();
    const [roomState, roomDispatch] = useRoom();
    const navigate = useNavigate();

    useEffect(() => {
        roomService.getFreeRooms(state.searchInfo)
            .then(data => roomDispatch(room.getFreeRooms({ rooms: data })));
    }, []);

    const handleBooking = function (room) {
        dispatch(search.cacheCard({
            ...room,
            type: state.searchInfo.type
        }));

        roomDispatch(search.cacheCard({ room: room }));
    }

    const handleBookingRemove = function (payload) {
        dispatch(search.removeCard(payload))
        roomDispatch(search.removeCard({ room: payload }));
    }

    const handleSearch = function (info) {
        dispatch(search.cacheSearch(info));
        roomService.getFreeRooms(state.searchInfo)
            .then(data => roomDispatch(room.getFreeRooms({ rooms: data })));
    }

    const handleCreateCard = function () {
        navigate("/payment");
    }

    return (
        <div className="mt-15">
            <section className="search-section">
                <SearchBar
                    info={state.searchInfo}
                    handleSearch={handleSearch} />
            </section>

            <section className="rooms-section spad mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 row">
                            {roomState.rooms.map(room => {
                                return <Room key={room.id} handleBooking={handleBooking} room={room} />
                            })}
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
                        <div className="col-lg-12">
                            <div className="room-pagination">
                                <a href="#">1</a>
                                {/* <a href="#">Next <i className="fa fa-long-arrow-right"></i></a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}