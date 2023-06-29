import { useRoomDetail } from "@hooks/context-hooks";
import { roomDetailService } from "@services/index";
import { roomDetail } from "@store/actions";
import { createNotification } from "@utls/notification";
import { useEffect, useState } from "react";

export default function SearchBar({ handleSearch, info }) {
    const [search, setSearch] = useState({ ...info });
    const [roomDetailState, roomDetailDispatch] = useRoomDetail();

    useEffect(() => {
        roomDetailService.getAll()
            .then(data => roomDetailDispatch(roomDetail.getAll({ rooms: data })))
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            });
    }, [])

    return (
        <div className="bg-white shadow" style={{ padding: "35px" }}>
            <div className="row g-2">
                <div className="col-md-10">
                    <div className="row g-2">
                        <div className="col-md-4">
                            <label>Are you sure</label>
                            <div className="date" id="date1" data-target-input="nearest">
                                <input
                                    onChange={(e) => setSearch(prev => ({ ...prev, from: e.target.value }))}
                                    value={search.from}
                                    type="text" className="form-control datetimepicker-input" placeholder="Check in"
                                    data-target="#date1" data-toggle="datetimepicker" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>Are you sure</label>
                            <div className="date" id="date2" data-target-input="nearest">
                                <input
                                    onChange={(e) => setSearch(prev => ({ ...prev, to: e.target.value }))}
                                    value={search.to}
                                    type="text" className="form-control datetimepicker-input" placeholder="Check out"
                                    data-target="#date2" data-toggle="datetimepicker" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>Are you sure</label>
                            <div className="pr-5">
                                <select
                                    value={search.type}
                                    onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
                                    className="form-control">
                                    {roomDetailState.rooms.map(room => {
                                        return (
                                            <option
                                                key={room.id}
                                                value={room.roomType}>{room.roomType}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 d-inline-flex p-3">
                    <button
                        onClick={() => handleSearch(search)}
                        className="btn btn-primary w-100">Submit</button>
                </div>
            </div>
        </div>
    )
}