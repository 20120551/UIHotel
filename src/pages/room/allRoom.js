import ListRoom from "@components/room/tableRoom";
import { useEffect, useState } from "react";
import { roomService } from "@services/index";
import { NavLink } from "react-router-dom";
import { createNotification } from "@utls/notification";
import { ProtectComponent } from "@components/authorization";
import { role } from "@config/index";
export default function AllRooms() {
  return (
    <>
      <Header />
      <SearchBar />
      <RoomList />
    </>
  );
}

function Header() {
  return (
    <div className="page-header mt-5">
      <div className="row align-items-center">
        <div className="col">
          <div>
            <h4 className="card-title float-left mt-2">All Rooms</h4>{" "}
            <ProtectComponent allowRoles={[role.MANAGER]}>
              <NavLink
                to="./add-room"
                className="btn btn-primary float-right veiwbutton"
              >
                Add Room
              </NavLink>
            </ProtectComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="row">
      <div className="col-lg-12">
        <form>
          <div className="row formtype">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search service..."
                />
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group">
                <select className="form-control" id="sel1" name="sellist1">
                  <option>All room</option>
                  <option>Room ID</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <select className="form-control" id="sel1" name="catlist1">
                  <option>Room type</option>
                  <option>Single</option>
                  <option>Double</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <select className="form-control" id="sel1" name="status">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <a
                  href="#"
                  className="btn btn-success btn-block mt-0 search_button"
                >
                  {" "}
                  Search
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [index, setIndex] = useState(1);
  const [end, setEnd] = useState(1);

  useEffect(() => {
    roomService
      .GetAllRooms({ page: index, pageSize: 5 })
      .then((data) => {
        setRooms(data.values);
        setEnd(data.totalPage);
      })
      .catch((err) => {
        const { message = "", code = "" } = err.response?.data;
        createNotification({ type: "error", title: message, message: code });
      });
  }, [index]);

  return (
    <div className="row">
      <div className="col-sm-12">
        <ListRoom rooms={rooms} />
        <nav aria-label="..." className="mt-3 float-right">
          <ul className="pagination">
            <li
              className={"page-item " + (index === 1 ? "disabled" : "")}
              onClick={() => setIndex(index === 1 ? index : index - 1)}
            >
              <span className="page-link">Previous</span>
            </li>
            {[...Array(end)].map((x, i) => {
              if (i + 1 === index) {
                return (
                  <li key={i + 1} className="page-item active">
                    <a className="page-link" href="#">
                      {i + 1}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={i + 1} className="page-item">
                    <a className="page-link" href="#">
                      {i + 1}
                    </a>
                  </li>
                );
              }
            })}
            <li
              className={"page-item " + (index === end ? "disabled" : "")}
              onClick={() => setIndex(index === end ? index : index + 1)}
            >
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
