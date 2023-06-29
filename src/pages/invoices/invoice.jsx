import InvoiceStatus from "@components/invoice/invoiceStatus";
import MayEmpty from "@components/mayEmpty";
import { useInvoice } from "@hooks/context-hooks";
import { invoiceService } from "@services/index";
import { invoice } from "@store/actions";
import { createNotification } from "@utls/notification";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Invoice() {
    const [state, dispatch] = useInvoice();
    const [index, setIndex] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();

    const isEmpty = state.invoices?.length === 0 ? true : false;

    const handleSearch = function () {
        navigate(`/hotel/invoice/${search}`);
    }

    useEffect(() => {
        invoiceService.getAll({ page: index, take: 3, status })
            .then(invoices => {
                dispatch(invoice.getAllInvoice({ invoices }));
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, [index, status])

    return (
        <>

            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="mt-5">
                            <h3 className="card-title float-left mt-2">Invoice</h3>
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
                                    <label>Invoice</label>
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Search</label>
                                    <div
                                        onClick={handleSearch}
                                        className="btn btn-success btn-block mt-0 search_button"> Search </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-body booking_card">
                        <div className="mb-2">
                            <ul className="nav nav-tabs nav-tabs-solid">
                                <li className="nav-item"><a className="nav-link active" href="#solid-tab1"
                                    data-toggle="tab"
                                    onClick={() => setStatus("pending")}>Pending</a></li>
                                <li className="nav-item"><a className="nav-link" href="#solid-tab2"
                                    data-toggle="tab"
                                    onClick={() => setStatus("partly_deposited")}>Deposit</a></li>
                                <li className="nav-item"><a className="nav-link" href="#solid-tab3"
                                    data-toggle="tab"
                                    onClick={() => setStatus("checkout")}>Checkout</a></li>
                            </ul>
                        </div>
                        <div className="table-responsive">
                            <MayEmpty isEmpty={isEmpty} name="invoice">
                                <table className="table-stripped table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Invoice Number</th>
                                            <th>Created Date</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Customer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.invoices && state.invoices.map((invoice, index) => {
                                            const { id, date, status, totalSum, nameCus } = invoice;
                                            return (
                                                <tr
                                                    onClick={() => navigate(`/hotel/invoice/${id}`)}
                                                    key={id}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {id}
                                                    </td>
                                                    <td>{date}</td>
                                                    <td>
                                                        <InvoiceStatus status={status} />
                                                    </td>
                                                    <td>{parseFloat(totalSum).toLocaleString('en')} VND</td>
                                                    <td>{nameCus}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </MayEmpty>
                        </div>
                        <nav aria-label="Page navigation" className="mt-3 float-right">
                            <ul className="pagination">
                                <li
                                    className="page-item page-link"
                                    onClick={() => setIndex(index == 1 ? index : index - 1)}>Previous</li>
                                <li
                                    className="page-item page-link">{index}</li>
                                <li
                                    className="page-item page-link"
                                    onClick={() => setIndex(isEmpty ? index : index + 1)}>Next</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}