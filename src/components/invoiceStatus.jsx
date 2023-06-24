export default function InvoiceStatus({ status }) {
    console.log(status);
    switch (status) {
        case "pending":
            return <div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Pending</a> </div>
        case "partly_deposited":
            return <div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Deposited</a> </div>
        case "checkout":
            return <div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Checkout</a> </div>
        default:
            return <></>
    }
}