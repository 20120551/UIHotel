export default function PaymentDetail({ logs }) {
    return ((
        <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Payment Detail</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center">
                        {logs.map((log, index) => {
                            return <p className="d-block" key={index}>{log}</p>;
                        })}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div >)
    );
}