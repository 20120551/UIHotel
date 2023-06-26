export default function InvoiceStatus({ status }) {
    console.log(status);
    switch (status) {
        case "pending":
            return <div className="actions"> <a href="#" className="btn btn-sm bg-success-light mr-2">Pending</a> </div>
        case "partly_deposited":
            return <div className="actions"> <a href="#" className="btn btn-sm bg-success-light mr-2">Deposited</a> </div>
        case "checkout":
            return <div className="actions"> <a href="#" className="btn btn-sm bg-success-light mr-2">Checkout</a> </div>
        default:
            return <></>
    }
}