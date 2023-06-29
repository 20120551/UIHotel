import { NavLink } from "react-router-dom";
import { roomService } from "@services/index";
import { ProtectComponent } from "@components/authorization";
import { role } from "@config/index";
const ListRoom = (props) => {
  const rooms = props.rooms;
  const handelDelete = async (id) => {
    //  e.preventDefault();
    let warning = `Are you sure remove room id ${id}`;
    if (confirm(warning) != true) {
      return;
    }
    await roomService
      .deleteRoom(id)
      .then(() => {
        alert(`Successfully remove room id ${id}`);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                    <td>{parseFloat(room.price).toLocaleString('en')} VND / night</td>
                    <td>
                      <NavLink to="/hotel/room-detail">
                        {room.roomDetail}
                      </NavLink>
                    </td>
                    <td>
                      <div
                        className={
                          "mr-2 " +
                          (room.status.toLowerCase() == "active"
                            ? "bg-success-light"
                            : "bg-warning-light")
                        }
                      >
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
                          <ProtectComponent allowRoles={[role.MANAGER]}>
                            <NavLink
                              className="dropdown-item"
                              to={`/hotel/room/edit-room/${room.id}`}
                            >
                              <i className="fas fa-pencil-alt m-r-5"></i> Edit
                            </NavLink>
                            <div
                              className="dropdown-item"
                              data-toggle="modal"
                              data-target="#delete_asset"
                              onClick={async (e) => {
                                await handelDelete(room.id);
                              }}
                            >
                              <i className="fas fa-trash-alt m-r-5"></i> Delete
                            </div>
                          </ProtectComponent>
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
