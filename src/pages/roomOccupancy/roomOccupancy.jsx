
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { roomOccupancyService } from "@services";
export default function RoomOccupancy() {

    const [revenue, setRevenue] = useState();
    var Label = [];
    const d = new Date();
    let thisMonth = d.getMonth() + 1;
    let thisYear = d.getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(thisYear)
    var percentage = [];
    const handleSearch = () => {
        roomOccupancyService.getByMonth({
            month: month,
            year: year
        }).then(data => {
            console.log(data);
            setRevenue(setData(data));

        })
        var chart = document.querySelector("#myChart");
        console.log(chart);
        chart.remove();
        var chartContainer = document.querySelector(".chartReport");
        var newLink = document.createElement('canvas');
        newLink.id = "myChart";
        newLink.className = "mx-auto w-25";
        chartContainer.append(newLink);
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Room occupancy report',
                        data: percentage,
                        backgroundColor: ["red", "green", "blue","purple","pink"],

                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "Revenue report "
                }
            },
        });
    }
    useEffect(() => {

        roomOccupancyService.getByMonth({
            month: month,
            year: year
        }).then(data => {
            console.log(data);
            setRevenue(setData(data));


        })

        const ctx = document.getElementById('myChart').getContext('2d');
         new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Room occupancy report',
                        data: percentage,
                        backgroundColor: ["red", "green", "blue","purple","pink"],

                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "Revenue report "
                }
            },
        });
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
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Month:</label>
                                    <div class="cal-icon">
                                        <input
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            type="number"
                                            data-provide="datepicker" class="form-control datepicker"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Year:</label>
                                    <div class="cal-icon">
                                        <input
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            type="number"
                                            data-provide="datepicker" class="form-control datepicker"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 justify-content-end">
                                <div class="form-group">
                                    <label>Search</label>
                                    <a href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleSearch()

                                        }}
                                        class="btn btn-success btn-block mt-0 search_button"> Search </a>

                                </div>
                            </div>
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
            <div className="row w-100 chartReport" >
                <canvas id="myChart" className="mx-auto w-25"  ></canvas>

            </div>
        </>
    )
}