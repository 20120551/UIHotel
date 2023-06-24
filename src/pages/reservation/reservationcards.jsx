import InvoiceStatus from "@components/invoiceStatus";
import MayEmpty from "@components/mayEmpty";
import { useInvoice } from "@hooks/context-hooks";
import { invoiceService } from "@services/index";
import { invoice } from "@store/actions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
    const [state, dispatch] = useInvoice();
    const [index, setIndex] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();

    const isEmpty = state.invoices?.length === 0 ? true : false;

    const handleSearch = function () {
        navigate(`/invoice/${search}`);
    }

    useEffect(() => {
        invoiceService.getAll({ page: index, take: 3, status })
            .then(invoices => {
                dispatch(invoice.getAllInvoice({ invoices }));
            })
    }, [index, status])

    return (
        <>
            <div   className="page-header">
                <div   className="row align-items-center">
                    <div   className="col">
                        <div   className="mt-5">
                            <h4   className="card-title float-left mt-2">Reservation cards</h4>
                            <a href="add-booking.html"   className="btn btn-primary float-right veiwbutton ">Add
                                Booking</a>
                        </div>
                    </div>
                </div>
            </div>
            <div   className="row">
                <div   className="col-sm-12">
                    <div   className="card card-table">
                        <div   className="card-body booking_card">
                            <div   className="table-responsive">
                                <div   className="mb-3 d-flex justify-content-between col-lg-8">
                                    <form   className="form-inline my-2 my-lg-0">
                                        <input   className="form-control mr-sm-2" type="search" placeholder="Invoice ID"
                                            aria-label="Search" />
                                        <button   className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="submit">&#x1F50E;</button>
                                    </form>
                                    <form   className="form-inline my-2 my-lg-0">
                                        <input   className="form-control mr-sm-2" type="search"
                                            placeholder="Reservation ID" aria-label="Search" />
                                        <button   className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="submit">&#x1F50E;</button>
                                    </form>
                                    <form   className="form-inline my-2 my-lg-0">
                                        <input type="text" name="DateRangePicker"   className="form-control mr-sm-2" />
                                        <button   className="btn btn-outline-secondary my-2 my-sm-0"
                                            type="submit">&#x1F50E;</button>
                                    </form>
                                </div>
                                <table   className="datatable table table-stripped table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Invoice ID</th>
                                            <th>Reservation ID</th>
                                            <th>Name</th>
                                            <th>Room ID</th>
                                            <th>Numbers</th>
                                            <th>Arrival Date</th>
                                            <th>Depature Date</th>
                                            <th>Email</th>
                                            <th>Ph.Number</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                            <th   className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>BKG-0001</td>
                                            <td>RESV-0001</td>
                                            <td>
                                                <h2   className="table-avatar">
                                                    <a href="profile.html"   className="avatar avatar-sm mr-2"><img
                                                          className="avatar-img rounded-circle"
                                                        src="assets/img/profiles/avatar-03.jpg"
                                                        alt="User Image" /></a>
                                                    <a href="profile.html">Tommy Bernal <span>#0001</span></a>
                                                </h2>
                                            </td>
                                            <td>G-102</td>
                                            <td>10</td>
                                            <td>22-03-2020</td>
                                            <td>23-03-2020</td>
                                            <td><a href="/cdn-cgi/l/email-protection"   className="__cf_email__"
                                                data-cfemail="2652494b4b5f44435448474a66435e474b564a430845494b">[email&#160;protected]</a>
                                            </td>
                                            <td>631-254-6480</td>
                                            <td>
                                                <div   className="actions"> <a href="#"
                                                      className="btn btn-sm bg-success-light mr-2">Active</a> </div>
                                            </td>
                                            <td>Has pet</td>
                                            <td   className="text-right">
                                                <div   className="dropdown dropdown-action"> <a href="#"
                                                      className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                    aria-expanded="false"><i
                                                          className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                    <div   className="dropdown-menu dropdown-menu-right">
                                                        <a   className="dropdown-item" href="edit-booking.html">
                                                            <i   className="fas fa-pencil-alt m-r-5"></i>
                                                            Edit
                                                        </a>
                                                        <a   className="dropdown-item" href="add-ChangeRoom.html">
                                                            <i   className="fas fa-pencil-alt m-r-5"></i>
                                                            Change room
                                                        </a>
                                                        <a   className="dropdown-item" href="#" data-toggle="modal"
                                                            data-target="#delete_asset">
                                                            <i   className="fas fa-trash-alt m-r-5"></i>
                                                            Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="delete_asset"   className="modal fade delete-modal" role="dialog">
                <div   className="modal-dialog modal-dialog-centered">
                    <div   className="modal-content">
                        <div   className="modal-body text-center"> <img src="assets/img/sent.png" alt="" width="50"
                            height="46" />
                            <h3   className="delete_class">Are you sure want to delete this Asset?</h3>
                            <div   className="m-t-20"> <a href="#"   className="btn btn-white" data-dismiss="modal">Close</a>
                                <button type="submit"   className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}