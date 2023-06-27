
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { revenueService } from "@services";
import { roomDetailService } from "@services";
export default function Revenue() {
    function generateRandomColor(length) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < length; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const [revenue, setRevenue] = useState();
    var Label = [];

    var percentage = [];
    var length;
    var color = [];

    useEffect(() => {
   
        revenueService.getThisMonthRevenue().then(data => {
            setRevenue(setData(data));


        })
        console.log("array", percentage)

        console.log("length" + length + color)
        const ctx = document.getElementById('myChart').getContext('2d');


        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Revenue report',
                        data: percentage,
                        backgroundColor: ["red", "green", "blue"],

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

            console.log(length);
            Label.push(revenue.id);
            percentage.push(revenue.percentage);
            results.push(
                <tr key={index}>
                    <td>{index}</td>
                    <td>{revenue.id}</td>
                    <td>{revenue.totalSum}</td>
                    <td>{revenue.percentage}</td>

                </tr>
            );
        });
        color = Array(length).fill().map(() => generateRandomColor(length));
        return results;
    }


    return (
        <>
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
            <script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
            <div class="page-header">
                <div class="row align-items-center">
                    <div class="col">
                        <div class="mt-5">
                            <h4 class="card-title float-left mt-2">Revenue Report</h4>
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
                                            <th>Room type</th>
                                            <th>Revenue</th>
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
            <div class="row w-100" >
                <canvas id="myChart" class="mx-auto w-25"  ></canvas>;

            </div>
            <script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />


        </>
    )
}