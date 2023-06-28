export default function PayInfo({
    searchInfo,
    cardInfo = [],
    handleBookingRemove,
    handleCreateCard }) {
    return (
        <div className="bg-white p-4">
            <div className="page-header ml-2">
                <div className="row align-items-center">
                    <h3 className="page-title text-center">Guests Booking</h3>
                </div>
            </div>
            <div className="border my-3"></div>
            <div>Time of stay</div>
            <div><b>{searchInfo.from} - {searchInfo.to}</b></div>
            <div className="border my-3"></div>
            <div className="my-3">Price Details</div>

            <div style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "420px" }}>
                {cardInfo.map((card, index) => {
                    const { id, type, price } = card;
                    return (
                        <div key={id}>
                            <div className="mb-2">
                                <b>Room {index}: G-{id}</b> | {type}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <b>{price} VND/night</b>
                                <button
                                    onClick={() => handleBookingRemove(card)}
                                    className="btn btn-outline-success">Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="border my-3"></div>
            <div className="d-flex justify-content-between">
                <div>Total Amount</div>
                <h4 className="font-weight-bold">{
                    cardInfo.reduce((init, card) => init + (card.detail?.price || card?.price || 0), 0)} VND</h4>
            </div>
            <button
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => handleCreateCard()}
                className="btn btn-info btn-block my-3">
                next
            </button>
        </div>
    );
}