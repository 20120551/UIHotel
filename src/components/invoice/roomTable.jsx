export default function RoomTable({ rooms, setRoomChanged }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Room</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-nowrap mb-0">
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
                  <tr key={id}>
                    <td>{index}</td>
                    <td>{id}</td>
                    <td>{maxGuest}</td>
                    <td>{status}</td>
                    <td>{price}</td>
                    <td>
                      <button
                        onClick={() =>
                          setRoomChanged((prev) => ({
                            ...prev,
                            newRoom: id,
                          }))
                        }
                        className="btn btn-info"
                      >
                        Change
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
