import { NavLink } from "react-router-dom";
const ListRoom = (props) => {
  const rooms = props.rooms;
  if (!rooms) {
    return <></>;
  }
  return (
    <div className="card card-table">
      <div className="card-body booking_card">
        <div className="table-responsive">
          <table
            id="roomlist"
            className="table table-stripped table table-hover table-center mb-0 text-center"
          >
            <thead>
              <tr>
                <th className="text-left">Room ID</th>
                <th>Room Type</th>
                <th>Standard Price</th>
                <th>Room Detail</th>
                <th>Status</th>
                <th>Note</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                return (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.price}</td>
                    <td>
                      <NavLink to="/hotel/room-detail">
                        {room.roomDetail}
                      </NavLink>
                    </td>
                    <td>
                      <div className="bg-success-light mr-2">
                        {" "}
                        {room.status}
                      </div>
                    </td>

                    <td>{room.note}</td>
                    <td className="text-right">
                      <div className="dropdown dropdown-action">
                        <div
                          className="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v ellipse_color"></i>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <NavLink
                            className="dropdown-item"
                            to={() => `/edit-room?id=${room.id}`}
                          >
                            <i className="fas fa-pencil-alt m-r-5"></i> Edit
                          </NavLink>
                          <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#delete_asset"
                          >
                            <i className="fas fa-trash-alt m-r-5"></i> Delete
                          </a>
                        </div>
                      </div>
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
};

export default ListRoom;
