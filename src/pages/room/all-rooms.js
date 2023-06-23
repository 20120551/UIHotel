import ListRoom from "../../components/list/listRoom";
import httpRequest from "utils/httpRequest";
import { useEffect, useState } from "react";
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
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <div>
            <h4 className="card-title float-left mt-2">All Rooms</h4>{" "}
            <a
              href="add-room.html"
              className="btn btn-primary float-right veiwbutton"
            >
              Add Room
            </a>
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

function RoomList(props) {
  // const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await httpRequest.get("/room");
      setRooms(result.data);
    };
    fetchApi();
  }, []);
  return (
    <div className="row">
      <div className="col-sm-12">
        <ListRoom rooms={rooms} />
      </div>
    </div>
  );
}
