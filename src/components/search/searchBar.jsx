import { useRoomDetail } from "@hooks/context-hooks";
import { roomDetailService } from "@services/index";
import { roomDetail } from "@store/actions";
import { useEffect, useState, useRef } from "react";
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker';
import moment from "moment";
import $ from 'jquery';
import { createNotification } from "@utls/notification";

export default function SearchBar({ handleSearch, info }) {
    const [search, setSearch] = useState({ ...info });
    const [roomDetailState, roomDetailDispatch] = useRoomDetail();
    const fromRef = useRef();
    const toRef = useRef();

    useEffect(() => {
        roomDetailService.getAll()
            .then(data => roomDetailDispatch(roomDetail.getAll({ rooms: data })))
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            });
    }, [])

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

    return (
        <div className="bg-white shadow" style={{ padding: "35px" }}>
            <div className="row g-2">
                <div className="col-md-10">
                    <div className="row g-2">
                        <div className="col-md-4">
                            <label>Are you sure</label>
                            <div className="date cal-icon" id="date1" data-target-input="nearest">
                                <input
                                    onChange={(e) => setSearch(prev => ({ ...prev, from: fromRef.current.value }))}
                                    value={fromRef.current ? fromRef.current.value : search.from}
                                    type="text" ref={fromRef} className="form-control" placeholder="Check in"
                                    data-target="#date1" data-toggle="datetimepicker" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>Are you sure</label>
                            <div className="date cal-icon" id="date2" data-target-input="nearest">
                                <input
                                    onChange={(e) => setSearch(prev => ({ ...prev, to: toRef.current.value }))}
                                    value={toRef.current ? toRef.current.value : search.to}
                                    type="text" ref={toRef} className="form-control" placeholder="Check out"
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
                        onClick={() => handleSearch({
                            ...search,
                            from: fromRef.current.value,
                            to: toRef.current.value
                        })}
                        className="btn btn-primary w-100">Submit</button>
                </div>
            </div>
        </div>
    )
}