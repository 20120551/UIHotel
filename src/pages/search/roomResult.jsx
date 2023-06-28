import { PaginationFooter } from "@components/search/paginationFooter";
import PayInfo from "@components/search/payInfo";
import Room from "@components/search/room";
import SearchBar from "@components/search/searchBar";
import { useRoom, useSearch } from "@hooks/context-hooks";
import { cardService, roomService } from "@services/index";
import { room, search } from "@store/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomResult() {
    const take = 2;
    const [page, setPage] = useState(1);
    const [state, dispatch] = useSearch();
    const [roomState, roomDispatch] = useRoom();
    const navigate = useNavigate();

    useEffect(() => {
        roomService.getFreeRooms(state.searchInfo)
            .then(data => {
                const rooms = fillRoom(data);
                roomDispatch(room.getFreeRooms({ rooms: rooms }));
                roomDispatch(room.paginationRooms({ take, page }));
            });
    }, []);

    const fillRoom = function (data) {
        var card =
            state.cardInfo.find(
                card => card.from === state.searchInfo.from && card.to === state.searchInfo.to)?.items;

        let rooms = data;
        if (card) {
            rooms = rooms.filter(room => {
                return !card.some(card => card.id === room.id)
            });
        }
        return rooms;
    }

    const getCorrectPage = function ({ length }) {
        // 2<3<=4
        // 2<2<=4
        if (length >= page * take) {
            if (page === 0) {
                return page + 1;
            }
            return page;
        }
        else if (length > (page - 1) * take) {
            return page;
        } else {
            return page - 1;
        }
    }
    const handleBooking = function (payload) {
        dispatch(search.cacheCard({
            ...payload,
            type: state.searchInfo.type
        }));

        roomDispatch(search.cacheCard({ room: payload }));

        const correctPage = getCorrectPage({
            length: roomState.rooms.length === 0 ? 0 : roomState.rooms.length - 1
        });
        setPage(correctPage);
        roomDispatch(room.paginationRooms({ page: correctPage, take }));
    }

    const handleBookingRemove = function (payload) {
        dispatch(search.removeCard(payload))
        roomDispatch(search.removeCard({ room: payload }));


        const correctPage = getCorrectPage({
            length: roomState.rooms.length + 1
        });

        setPage(correctPage);
        roomDispatch(room.paginationRooms({ page: correctPage, take }));
    }

    const handlePagination = function (e, payload) {
        e.preventDefault();
        roomService.getFreeRooms(state.searchInfo)
            .then(data => {
                const rooms = fillRoom(data);
                roomDispatch(room.getFreeRooms({ rooms: rooms }));

                const { page } = payload;
                setPage(page);
                roomDispatch(room.paginationRooms({ page, take }));
            });
    }

    const handleSearch = function (info) {
        dispatch(search.cacheSearch(info));
        roomService.getFreeRooms(info)
            .then(data => {
                const rooms = fillRoom(data);
                roomDispatch(room.getFreeRooms({ rooms: rooms }));
                roomDispatch(room.paginationRooms({ take, page: 1 }));
            });
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
                            {roomState.roomDisplay.map(room => {
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
                                <PaginationFooter
                                    take={take}
                                    handlePagination={handlePagination}
                                    length={roomState.rooms.length}
                                    page={page} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}