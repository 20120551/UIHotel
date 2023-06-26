import { Link } from "react-router-dom";

export default function Room({ room, handleBooking }) {

    return (
        <div className="col-lg-6 col-md-6">
            <div className="room-item">
                <img src={room.image} alt={`Room ${room.id}`} />
                <div className="ri-text">
                    <h4>Room {room.id}</h4>
                    <h3>{room.price}<span>/night</span></h3>
                    <table>
                        <tbody>
                            <tr>
                                <td className="r-o">Default Guest:</td>
                                <td>{room.defaultGuest}</td>
                            </tr>
                            <tr>
                                <td className="r-o">Capacity:</td>
                                <td>Max persion {room.maxGuest}</td>
                            </tr>
                            <tr>
                                <td className="r-o">Max Surcharge:</td>
                                <td>{room.maxSurchargeRatio}</td>
                            </tr>
                            <tr>
                                <td className="r-o">Max Oversea Surcharge:</td>
                                <td>{room.maxOverseaSurchargeRatio}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/search/${room.id}`} className="primary-btn">More Details</Link>
                    <button
                        onClick={() => handleBooking(room)}
                        className="btn btn-info float-right">booking</button>
                </div>
            </div>
        </div>
    )
}