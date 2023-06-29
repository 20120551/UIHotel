import { useEffect, useState, useRef } from "react"
import { roomDetailService, roomService } from "@services/index";
import { useRoom, useRoomDetail } from "@hooks/context-hooks";
import { room, roomDetail } from "@store/actions/index";
import { getVietnameseDate } from "@utls/date";
import RoomTable from "./roomTable";
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker';
import moment from "moment";
import $ from 'jquery';
import { createNotification } from "@utls/notification";

const date = new Date();
date.setDate(date.getDate() + 1)
export default function ChangeRoom({ oldRoom, handleChangeRoom }) {
    const [state, dispatch] = useRoom();
    const [roomDetailState, roomDetailDispatch] = useRoomDetail();
    const fromRef = useRef();
    const toRef = useRef();

    useEffect(() => {
        $(fromRef.current).daterangepicker({
            singleDatePicker: true,
            minDate: moment().startOf('day'),
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });
        $(toRef.current).daterangepicker({
            singleDatePicker: true,
            minDate: moment().startOf('day'),
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        });
    }, []);

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
            to: toRef.current ? toRef.current.value : roomChanged.to
        })
            .then(data => dispatch(room.getFreeRooms({ rooms: data })))
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, [roomChanged.roomType, roomChanged.from, roomChanged.to]);


    useEffect(() => {
        roomDetailService.getAll()
            .then(data => roomDetailDispatch(roomDetail.getAll({ rooms: data })))
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, []);

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
                                        disabled
                                        type="text" ref={fromRef} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-2">To</label>
                            <div className="col-md-10">
                                <div className="cal-icon">
                                    <input
                                        onChange={() => setRoomChanged(prev => ({
                                            ...prev, to: toRef.current.value
                                        }))}
                                        value={toRef.current ? toRef.current.value : roomChanged.to}
                                        type="text" className="form-control" ref={toRef} />
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
                        <div className="text-right">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleChangeRoom({ oldRoom, ...roomChanged, to: toRef.current ? toRef.current.value : roomChanged.to })
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