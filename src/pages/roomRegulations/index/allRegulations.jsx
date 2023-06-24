import {useState, useEffect} from 'react'
function AllRegulations(){
    const [data, setData] = useState();

    useEffect(() => {
      // fetch data
      const dataFetch = async () => {
        const data = await (
          await fetch(
            "https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-0062c85be6f9"
          )
        ).json();
  
        // set state when the data received
        setData(data);
      };
  
      dataFetch();
    }, []);
    console.log(data);

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
                                                    <th>Room Type</th>
                                                    <th>Price</th>
                                                    <th>Date</th>
                                                    <th>Maximum Guests</th>
                                                    <th>Default Guests</th>
                                                    <th>Max Surcharge Ratio</th>
                                                    <th>Max Oversea Surcharge Ratio:</th>
                            
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                <tr>
                                                    <td>BKG-0001</td>
                                                    <td>
                                                        VIP1
                                                    </td>
                                                    <td>200 000</td>
                                    
                                                    <td>21-03-2020</td>
                                                    <td >5</td>
                                                    <td>3</td>
                                                    <td>5%</td>
                                                    <td>10%</td>
            
                                                    <td className="text-right">
                                                        <div className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"><i className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-right"> <a className="dropdown-item" href="edit-regulations.html"><i className="fas fa-pencil-alt m-r-5"></i> Edit</a> <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset"><i className="fas fa-trash-alt m-r-5"></i> Delete</a> </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>BKG-0002</td>
                                                    <td>
                                                        vip2
                                                    </td>
                                                    <td>Single</td>
                                                    <td>8</td>
                                                    <td>21-03-2020</td>
                                                    <td>09.00 AM</td>
                                                    <td>22-03-2020</td>
                                                    <td>23-03-2020</td>

                                                    <td className="text-right">
                                                        <div className="dropdown dropdown-action"> <a href="/" className="action-icon dropdown-toggle" data-toggle="dropdown" ><i className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-right"> <a className="dropdown-item" href="/"><i className="fas fa-pencil-alt m-r-5"></i> Edit</a> <a className="dropdown-item" href="/" data-toggle="modal" data-target="#delete_asset"><i className="fas fa-trash-alt m-r-5"></i> Delete</a> </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>BKG-0003</td>
                                                    <td>
                                                        vip3
                                                    </td>
                                                    <td>Double</td>
                                                    <td>10</td>
                                                    <td>21-03-2020</td>
                                                    <td>08.00 AM</td>
                                                    <td>22-03-2020</td>
                                                    <td>23-03-2020</td>

                                                    <td className="text-right">
                                                        <div className="dropdown dropdown-action"> <a href="/" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-v ellipse_color"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-right"> <a className="dropdown-item" href="/"><i className="fas fa-pencil-alt m-r-5"></i> Edit</a> <a className="dropdown-item" href="/" data-toggle="modal" data-target="#delete_asset"><i className="fas fa-trash-alt m-r-5"></i> Delete</a> </div>
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
                </div>
                <div id="delete_asset" className="modal fade delete-modal" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center"> <img src="assets/img/sent.png" alt="" width="50" height="46"/>
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