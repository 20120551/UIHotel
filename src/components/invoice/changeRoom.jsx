import { useEffect, useState } from "react"
import { roomService } from "@services/index";
import { useRoom } from "@hooks/context-hooks";
import { room } from "@store/actions/index";
import { getVietnameseDate } from "@utls/date";
import RoomTable from "./roomTable";

const date = new Date();
date.setDate(date.getDate() + 1)
export default function ChangeRoom({ oldRoom, handleChangeRoom }) {
    const [state, dispatch] = useRoom();
    const [roomChanged, setRoomChanged] = useState({
        from: getVietnameseDate(),
        to: getVietnameseDate(date),
        roomType: "double",
        newRoom: ''
    });

    useEffect(() => {
        roomService.getFreeRooms({
            type: roomChanged.roomType,
            from: roomChanged.from,
            to: roomChanged.to
        })
            .then(data => dispatch(room.getFreeRooms({ rooms: data })));
    }, [roomChanged.roomType, roomChanged.from, roomChanged.to]);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Change room</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label className="col-form-label col-md-2">Old Room</label>
                            <div className="col-md-10">
                                <input
                                    readOnly
                                    value={oldRoom}
                                    type="text"
                                    className="form-control"
                                    placeholder=".form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-2">New Room</label>
                            <div className="col-md-10">
                                <input
                                    readOnly
                                    value={roomChanged.newRoom}
                                    type="text"
                                    className="form-control" placeholder=".form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-2">From</label>
                            <div className="col-md-10">
                                <div className="cal-icon">
                                    <input
                                        onChange={(e) => setRoomChanged(prev => ({
                                            ...prev, from: e.target.value
                                        }))}
                                        value={roomChanged.from}
                                        type="text" className="form-control datetimepicker" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-2">To</label>
                            <div className="col-md-10">
                                <div className="cal-icon">
                                    <input
                                        onChange={(e) => setRoomChanged(prev => ({
                                            ...prev, to: e.target.value
                                        }))}
                                        value={roomChanged.to}
                                        type="text" className="form-control datetimepicker" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-form-label col-md-2">Room Type</label>
                            <div className="col-md-10">
                                <select
                                    onChange={(e) => setRoomChanged(prev => ({
                                        ...prev, roomType: e.target.value
                                    }))}
                                    className="form-control" id="sel1" name="sellist1">
                                    <option value="double">Double</option>
                                    <option value="2">Category 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleChangeRoom({ oldRoom, ...roomChanged })
                                }}
                                className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <RoomTable rooms={state.rooms} setRoomChanged={setRoomChanged} />
        </>
    )
}