import { useEffect, useState } from "react"
import { revenueService, reservationService } from "@services";
import dateFormat, { masks } from "dateformat";
import Chart from 'chart.js/auto';
import { max } from "moment";
import MayEmpty from "@components/mayEmpty";
import { Link } from "react-router-dom";
import InvoiceStatus from "@components/invoice/invoiceStatus";
import { useNavigate } from "react-router-dom";
export default function StaffDashBoard() {
    const navigate = useNavigate();
    const [isEmpty, setIsEmpty] = useState(true);
    const [booked, setBooked] = useState([]);
    let pendingList= []
    let partlyDepositedList= [];
    let checkoutList= []
    const [notCheckin,setNotCheckin]=useState([]);
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

        reservationService.getByReservationByPeriodTime(
            {
                from: fDay,
                to: lDay
            }
        ).then(data => {
            console.log(data);
            pendingList=data.filter(x=>x.status=="pending")
            partlyDepositedList=data.filter(x=>x.status=="partly_deposited")
            checkoutList=data.filter(x=>x.status=="checkout")
            setNotCheckin(data.filter(x=>x.status=="pending"||x.status=="partly_deposited"))
            setBooked(data)
            setIsEmpty(false);
            console.log(checkoutList,partlyDepositedList,pendingList)
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
                    labels: ["Checkout","Partly Deposited","Pending"],
                    datasets: [
                        {
                            label: 'Booking report this month',
                            data: [checkoutList.length,partlyDepositedList.length,pendingList.length],
                            backgroundColor: ["#F1C27B", "#A2CDB0", "#C2DEDC", "#F2D8D8"],
    
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: "Booking report this month "
                    }
                },
            });
        })


        // var monthList = []
        // for (let m = 1; m <= month; m++) {
        //     monthList.push(m);
        // }
        // console.log(monthList)
        // RevenueList = []
        // Promise.all(monthList.map((month) => {

        //     revenueService.getRevenueByMonth({
        //         month: month,
        //         year: year
        //     }).then(data => {
        //         var totalSum = 0;
        //         data.forEach((revenue, index) => {
        //             totalSum = totalSum + revenue.totalSum;
        //         })
        //         RevenueList.push(totalSum)
        //         setTotalRevenue(totalRevenue + totalSum)

        //     })

        // }))
        // console.log(RevenueList)


        // var chart = document.querySelector("#myChart");
        // if (chart) {
        //     // console.log(chart);
        //     chart.remove();
        //     var chartContainer = document.querySelector(".chartReport");
        //     var newLink = document.createElement('canvas');
        //     newLink.id = "myChart";
        //     newLink.className = "mx-auto w-75";
        //     chartContainer.append(newLink);

        // }
        // const ctx = document.getElementById('myChart').getContext('2d');
        // new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: monthList,
        //         datasets: [
        //             {
        //                 label: 'Revenue monthly report',
        //                 data: RevenueList,
        //                 backgroundColor: ["rgb(75, 192, 192)"],
        //                 borderColor: 'rgb(75, 192, 192)',
        //                 tension: 0.1
        //             },
        //         ],
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: "Revenue report "
        //         }
        //     },
        // });


     
    }, [])
    const HandleEditReservationCard = (id) => {
        navigate(`/hotel/reservation/edit/${id}`);
    }
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12 mt-5">
                        <h3 className="page-title mt-3">Welcome to Roomee's hotel managment</h3>
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
                                    <h3 className="card_widget_header">{checkoutList.length}</h3>
                                    <h6 className="text-muted">Total Checkout </h6> </div>
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
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{partlyDepositedList.length}</h3>
                                    <h6 className="text-muted">Total partly deposited</h6> </div>
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
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{pendingList.length}</h3>
                                    <h6 className="text-muted">Total Pending </h6> </div>
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
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card board1 fill">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <div>
                                    <h3 className="card_widget_header">{booked.length} </h3>
                                    <h6 className="text-muted">Total booking this month</h6> </div>
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
            <div className="row ">

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
            <div className="row">
                <div className="col-md-12 d-flex">
                    <div className="card card-table flex-fill">
                        <div className="card-header">
                            <h4 className="card-title float-left mt-2">Booking</h4>
                            <button type="button" className="btn btn-primary float-right veiwbutton"> <Link to="/hotel/reservation" style={{textDecoration:"none",color:"white"}}>View All</Link></button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-center">
                                    <thead>
                                        <tr>
                                            <th>Reservation ID</th>
                                            <th>Invoice ID</th>
                                            <th>Room ID</th>
                                            <th>Name</th>
                                            <th>Guests number</th>
                                            <th>Arrival Date</th>
                                            <th>Depature Date</th>
                                            <th>Detail</th>
                                            <th>Status</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <MayEmpty isEmpty={isEmpty} name="reservation cards">
                                        <tbody>
                                            {notCheckin && notCheckin.map((card) => {
                                                
                                                const { id, invoiceId, guestName, roomId, guestsNumber, arrivalDate, departureDate, notes, status } = card;
                                                return (
                                                    <tr key={id}>
                                                        <td>{id}</td>
                                                        <td><Link className="text-success" to={`/hotel/invoice/${invoiceId}`}>{invoiceId}</Link></td>
                                                        <td>{roomId}</td>
                                                        <td>{guestName}</td>
                                                        <td>{guestsNumber}</td>
                                                        <td>{arrivalDate}</td>
                                                        <td>{departureDate}</td>
                                                        <td>
                                                            <button className="btn btn-link text-success text-left p-0" onClick={(e) => { HandleDetail(id) }}>
                                                                Details
                                                            </button>
                                                        </td>
                                                        <td><InvoiceStatus status={status} /></td>
                                                        <td className="text-right">
                                                            <div className="dropdown dropdown-action"> <a href="#"
                                                                className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                aria-expanded="false"><i
                                                                    className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item"
                                                                        onClick={() => { HandleEditReservationCard(id) }}>
                                                                        <i className="fas fa-pencil-alt m-r-5"></i>
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </MayEmpty>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}