import { convertMsToMinutesSeconds } from "@utls/date";
export default function PaymentModel({
    url, timer, payMethod, isActive, total, buttonRef }) {

    return (
        !isActive ? <></> : (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Payment Method {payMethod}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                            <img src={url} alt="qr code" />
                            <p>{convertMsToMinutesSeconds(total - timer)}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={buttonRef}
                                type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >)
    )
}