import { useEffect, useState } from "react"
import { revenueService, reservationService } from "@services";
import dateFormat, { masks } from "dateformat";
import Chart from 'chart.js/auto';
import { max } from "moment";

export default function AdminDashBoard() {
    const [revenue, setRevenue] = useState();
    const [booked, setBooked] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [highestMonth, setHighestMonth] = useState();
    var RevenueList = [];
    var Label = [];
    var percentage = [];
    const d = new Date();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const fDay = dateFormat(firstDay, "dd/mm/yyyy")
    // console.log(fDay)

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lDay = dateFormat(lastDay, "dd/mm/yyyy")
    // console.log(fDay, lDay)
    useEffect(() => {

        revenueService.getRevenueByMonth({
            month: month,
            year: year
        }).then(data => {

            var totalSum = 0;
            data.forEach((revenue, index) => {
                Label.push(revenue.id);
                percentage.push(revenue.percentage);
                totalSum = totalSum + revenue.totalSum
            })
            setRevenue(totalSum);
        })

        reservationService.getByReservationByPeriodTime(
            {
                from: fDay,
                to: lDay
            }
        ).then(data => {
            setBooked(data.length)
        })
        var monthList = []
        for (let m = 1; m <= month; m++) {
            monthList.push(m);
        }
        // console.log(monthList)
        RevenueList = []
        Promise.all(monthList.map((month) => {

            revenueService.getRevenueByMonth({
                month: month,
                year: year
            }).then(data => {
                var totalSum = 0;
                data.forEach((revenue, index) => {
                    totalSum = totalSum + revenue.totalSum;
                })
                RevenueList.push(totalSum)
                setTotalRevenue(totalRevenue + totalSum)

            })

        }))
        // console.log(RevenueList)


        var chart = document.querySelector("#myChart");
        if (chart) {
            // console.log(chart);
            chart.remove();
            var chartContainer = document.querySelector(".chartReport");
            var newLink = document.createElement('canvas');
            newLink.id = "myChart";
            newLink.className = "mx-auto w-75";
            chartContainer.append(newLink);

        }
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthList,
                datasets: [
                    {
                        label: 'Revenue monthly report',
                        data: RevenueList,
                        backgroundColor: ["rgb(75, 192, 192)"],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
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


        var chart = document.querySelector("#PieChart");
        if (chart) {
            // console.log(chart);
            chart.remove();
            var chartContainer = document.querySelector(".PieChartReport");
            var newLink = document.createElement('canvas');
            newLink.id = "PieChart";
            newLink.className = "mx-auto w-50";
            chartContainer.append(newLink);

        }
        const ct = document.getElementById('PieChart').getContext('2d');
        new Chart(ct, {
            type: 'pie',
            data: {
                labels: Label,
                datasets: [
                    {
                        label: 'Revenue report by room type',
                        data: percentage,
                        backgroundColor: ["#F1C27B", "#A2CDB0", "#C2DEDC", "#F2D8D8"],

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
    }, [])

    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12 mt-5">
                        <h3 className="page-title mt-3">Good Morning Admin</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{parseFloat(revenue).toLocaleString('en')} VND </h3>
                                    <h6 className="text-muted">Revenue This Month</h6> </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{booked}</h3>
                                    <h6 className="text-muted">Total resevation this month</h6> </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{parseFloat(totalRevenue).toLocaleString('en')} VND</h3>
                                    <h6 className="text-muted">Revenue this year</h6> </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{(revenue/totalRevenue)*100} %</h3>
                                    <h6 className="text-muted">This month' revenue percentage</h6> </div>
                                <div className="ml-auto mt-md-3 mt-lg-0"> <span className="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#009688" className="feather feather-globe">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                    </path>
                                </svg></span> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h4 className="card-title">Revenue this month</h4> </div>
                        <div className="card-body" >
                            <div className="row w-100 chartReport" >
                                <canvas id="myChart" className="mx-auto w-75"  ></canvas>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h4 className="card-title">Revenue by room type</h4> </div>
                        <div className="row w-100 PieChartReport" >
                            <canvas id="PieChart" className="mx-auto w-50"  ></canvas>

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-md-12 d-flex">
                    <div className="card card-table flex-fill">
                        <div className="card-header">
                            <h4 className="card-title float-left mt-2">Booking</h4>
                            <button type="button" className="btn btn-primary float-right veiwbutton">Veiw All</button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-center">
                                    <thead>
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Name</th>
                                            <th>Email ID</th>
                                            <th>Aadhar Number</th>
                                            <th className="text-center">Room Type</th>
                                            <th className="text-right">Number</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-nowrap">
                                                <div>BKG-0001</div>
                                            </td>
                                            <td className="text-nowrap">Tommy Bernal</td>
                                            <td><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="3743585a5a4e55524559565b77524f565a475b521954585a">[email&#160;protected]</a></td>
                                            <td>12414786454545</td>
                                            <td className="text-center">Double</td>
                                            <td className="text-right">
                                                <div>631-254-6480</div>
                                            </td>
                                            <td className="text-center"> <span className="badge badge-pill bg-success inv-badge">INACTIVE</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="text-nowrap">
                                                <div>BKG-0002</div>
                                            </td>
                                            <td className="text-nowrap">Ellen Thill</td>
                                            <td><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="89fbe0eae1e8fbedebfbe6ebfafdc9ecf1e8e4f9e5eca7eae6e4">[email&#160;protected]</a></td>
                                            <td>5456223232322</td>
                                            <td className="text-center">Double</td>
                                            <td className="text-right">
                                                <div>830-468-1042</div>
                                            </td>
                                            <td className="text-center"> <span className="badge badge-pill bg-success inv-badge">INACTIVE</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="text-nowrap">
                                                <div>BKG-0003</div>
                                            </td>
                                            <td className="text-nowrap">Corina Kelsey</td>
                                            <td><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="76131a1a1318021e1f1a1a36130e171b061a135815191b">[email&#160;protected]</a></td>
                                            <td>454543232625</td>
                                            <td className="text-center">Single</td>
                                            <td className="text-right">
                                                <div>508-335-5531</div>
                                            </td>
                                            <td className="text-center"> <span className="badge badge-pill bg-success inv-badge">INACTIVE</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="text-nowrap">
                                                <div>BKG-0004</div>
                                            </td>
                                            <td className="text-nowrap">Carolyn Lane</td>
                                            <td><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="50333f22393e313b353c23352910373d31393c7e333f3d">[email&#160;protected]</a></td>
                                            <td>2368989562621</td>
                                            <td className="text-center">Double</td>
                                            <td className="text-right">
                                                <div>262-260-1170</div>
                                            </td>
                                            <td className="text-center"> <span className="badge badge-pill bg-success inv-badge">INACTIVE</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="text-nowrap">
                                                <div>BKG-0005</div>
                                            </td>
                                            <td className="text-nowrap">Denise</td>
                                            <td><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="1c7f7d6e73706572707d72795c7b717d7570327f7371">[email&#160;protected]</a></td>
                                            <td>3245455582287</td>
                                            <td className="text-center">Single</td>
                                            <td className="text-right">
                                                <div>570-458-0070</div>
                                            </td>
                                            <td className="text-center"> <span className="badge badge-pill bg-success inv-badge">INACTIVE</span> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )


}