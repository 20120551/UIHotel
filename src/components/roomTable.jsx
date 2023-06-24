export default function RoomTable({ rooms, setRoomChanged }) {
    return (
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Room</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-nowrap mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Room</th>
                                <th>Max Guest</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room, index) => {
                                const { id, status, price, maxGuest } = room;
                                return (
                                    <tr
                                        key={id}>
                                        <td>{index}</td>
                                        <td>{id}</td>
                                        <td>{maxGuest}</td>
                                        <td>{status}</td>
                                        <td>{price}</td>
                                        <td>
                                            <button
                                                onClick={() => setRoomChanged(prev => ({
                                                    ...prev,
                                                    newRoom: id
                                                }))}
                                                className="btn btn-info">Change</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}