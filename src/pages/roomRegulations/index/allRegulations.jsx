import axios from "axios";
import React from "react";
const baseURL = "http://localhost:5000/api/Regulation";
function AllRegulations() {

    const[regulations,setRegulations]= React.useState([]);
    React.useEffect(() => {
      axios.get(baseURL).then((response) => {
        const results=[null];

        setRegulations(setData(response.data));
      })
    }, [regulations]);

    function setData(data){
        const results=[null];
        data.forEach((employee, index) => {
            results.push(
                <tr key={index}>
                    <td>{employee.id}</td>
                    <td>
                        {employee.maxGuest}
                    </td>
                    <td>
                        {employee.defaultGuest}
                    </td>
                    <td>
                        {employee.maxOverseaSurchargeRatio}
                    </td>
                    <td>
                        {employee.maxSurchargeRatio}
                        </td>
                    <td>
                        {employee.roomExchangeFee}
                    </td>
    
                    <td className="text-right">
                        <div className="dropdown dropdown-action"> <a href="/" className="action-icon dropdown-toggle" data-toggle="dropdown" ><i className="fas fa-ellipsis-v ellipse_color"></i></a>
                            <div className="dropdown-menu dropdown-menu-right"> <a className="dropdown-item" href="/"><i className="fas fa-pencil-alt m-r-5"></i> Edit</a> <a className="dropdown-item" href="/" data-toggle="modal" data-target="#delete_asset"><i className="fas fa-trash-alt m-r-5"></i> Delete</a> </div>
                        </div>
                    </td>
                </tr>
            );
        });
        return results;
    }


    return (
        <>
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="mt-5">
                                <h4 className="card-title float-left mt-2">Regulations</h4> <a href="add-regulation.html" className="btn btn-primary float-right veiwbutton">Add Regulation</a> </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card card-table">
                            <div className="card-body booking_card">
                                <div className="table-responsive">
                                    <table className="datatable table table-stripped table table-hover table-center mb-0">
                                        <thead>
                                            <tr>
                                                <th>Regulation ID</th>
                                                <th>Maximum Guests</th>
                                                <th>Default Guests</th>
                                                <th>Max Surcharge Ratio</th>
                                                <th>Max Oversea Surcharge Ratio:</th>
                                                <th>Room Exchange Fee:</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {regulations}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="delete_asset" className="modal fade delete-modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center"> <img src="assets/img/sent.png" alt="" width="50" height="46" />
                            <h3 className="delete_className">Are you sure want to delete this Asset?</h3>
                            <div className="m-t-20"> <a href="/" className="btn btn-white" data-dismiss="modal">Close</a>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AllRegulations