
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { revenueService } from "@services";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Revenue() {
    var chart = null;
    const search = useLocation().search;
    const qMonth = new URLSearchParams(search).get('month');
    const qYear = new URLSearchParams(search).get('year');
    console.log(qMonth + qYear);
    function generateRandomColor(length) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < length; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const d = new Date();
    let thisMonth = d.getMonth() + 1;
    let thisYear = d.getFullYear();
    const [month, setMonth] = useState(thisMonth);
    const [year, setYear] = useState(thisYear)
    // if(qMonth!==null&& qYear!==null){
    //     setMonth(qMonth)
    //     setYear(qYear)
    // }
    const [revenue, setRevenue] = useState();
    var Label = [];

    var percentage = [];
    var length;
    var color = [];
    const handleSearch = () => {
        revenueService.getRevenueByMonth({
            month: month,
            year: year
        }).then(data => {
            setRevenue(setData(data));
        })
        var chart= document.querySelector("#myChart");
        console.log(chart);
        chart.remove();
        var chartContainer=document.querySelector(".chartReport");
        var newLink = document.createElement('canvas');
        newLink.id="myChart";
        newLink.className="mx-auto w-25";
        chartContainer.append(newLink);
        const ctx = document.getElementById('myChart').getContext('2d');
        var  Piechart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Revenue report',
                        data: percentage,
                        backgroundColor: ["#F1C27B", "#A2CDB0", "#C2DEDC", "#F2D8D8"],

                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "Revenue report ",
                    color: 'navy',
                    position: 'bottom',
                    align: 'center',
                    font: {
                       weight: 'bold'
                    },
                    padding: 8,
                    fullSize: true,
                },
                plugins: {
                    title: {
                       display: true,
                       text: 'Revenue report',
                       color: 'navy',
                       position: 'bottom',
                       align: 'center',
                       font: {
                          weight: 'bold'
                       },
                       padding: 8,
                       fullSize: true,
                    }}
            },
        });
        setTimeout(function() { Piechart.update(); },1000);
        
    }
    useEffect(() => {
        console.log("rerender");
        revenueService.getRevenueByMonth({
            month: month,
            year: year
        }).then(data => {
            setRevenue(setData(data));


        })
        var chart = document.querySelector("#myChart");
        if (chart) {
            // console.log(chart);
            chart.remove();
            var chartContainer = document.querySelector(".chartReport");
            var newLink = document.createElement('canvas');
            newLink.id = "myChart";
            newLink.className = "mx-auto w-25";
            chartContainer.append(newLink);

        }
        const ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Revenue report',
                        data: percentage,
                        backgroundColor: ["#F1C27B", "#A2CDB0", "#C2DEDC", "#F2D8D8"],

                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "Revenue report ",
                    color: 'navy',
                    position: 'bottom',
                    align: 'center',
                    font: {
                       weight: 'bold'
                    },
                    padding: 8,
                    fullSize: true,
                },
                plugins: {
                    title: {
                       display: true,
                       text: 'Revenue report',
                       color: 'navy',
                       position: 'bottom',
                       align: 'center',
                       font: {
                          weight: 'bold'
                       },
                       padding: 8,
                       fullSize: true,
                    }}
            },
        });
        setTimeout(function() { myChart.update(); },1000);
   
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
                    <td>{parseFloat(revenue.totalSum).toLocaleString('en')} VND</td>
                    <td>{revenue.percentage.toFixed(2)} %</td>

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
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="mt-5">
                            <h4 className="card-title float-left mt-2">Revenue Report</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <form>
                        <div className="row formtype">

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Month:</label>
                                    <div className="cal-icon">
                                        <input
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            type="number"
                                            className="form-control " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Year:</label>
                                    <div className="cal-icon">
                                        <input
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            type="number"
                                            className="form-control " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 justify-content-end">
                                <div className="form-group">
                                    <label>Search</label>
                                    <a href="#" className="btn btn-success btn-block mt-0 search_button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleSearch()

                                        }}> Search </a>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="datatable table table-stripped">
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
            <div className="row w-100 chartReport" >
                <canvas id="myChart" className="mx-auto w-25"  ></canvas>

            </div>
            <script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />


        </>
    )
}