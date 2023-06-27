
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { roomOccupancyService } from "@services";
export default function RoomOccupancy() {

    const [revenue, setRevenue] = useState();
    var Label = [];

    var percentage = [];

    useEffect(() => {

        roomOccupancyService.getThisMonth().then(data => {
            console.log(data);
            setRevenue(setData(data));


        })


    }, []);

    const setData = (data) => {
        const results = [null];
        data.forEach((revenue, index) => {

            Label.push(revenue.id);
            percentage.push(revenue.percentage);
            results.push(
                <tr key={index}>
                    <td>{index}</td>
                    <td>{revenue.id}</td>
                    <td>{revenue.freq}</td>
                    <td>{revenue.percentage}</td>

                </tr>
            );
        });

        return results;
    }


    return (
        <>
            <div class="page-header">
                <div class="row align-items-center">
                    <div class="col">
                        <div class="mt-5">
                            <h4 class="card-title float-left mt-2">Room Occupancy Report</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <form>
                        <div class="row formtype">
                            {/* <div class="col-md-3">
                                <div class="form-group">
                                    <label>Room Type</label>
                                    <select class="form-control" id="sel1" name="sellist1">
                                        <option>Select type</option>
                                        <option>VIP 1</option>
                                        <option>Regular 1</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Room ID</label>
                                    <select class="form-control" id="sel2" name="sellist2">
                                        <option>Select ID</option>
                                        <option>V001</option>
                                        <option>V002</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Month:</label>
                                    <div class="cal-icon">
                                        <input type="text" data-provide="datepicker" class="form-control datepicker"
                                            data-date-format="mm/dd/yyyy" name="datepicker" id="datepicker" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 justify-content-end">
                                <div class="form-group">
                                    <label>Search</label>
                                    <a href="#" class="btn btn-success btn-block mt-0 search_button"> Search </a>

                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="datatable table table-stripped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Room ID</th>
                                            <th>Total Days</th>
                                            <th>Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenue}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}