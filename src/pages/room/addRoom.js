// import ListRoom from "@components/room/tableRoom";
import { useEffect, useState } from "react";
import { roomService } from "@services/index";
import { roomDetailService } from "@services/index";
export default function AddRoom() {
  const [details, setDetails] = useState([]);
  const [id, setID] = useState(0);
  const [status, setStatus] = useState("Active");
  const [note, setNote] = useState("");
  const [detailID, setDetailID] = useState(0);
  const [SelectedDetail, setSelectedDetail] = useState({
    id: 999,
    price: 9999,
    roomType: "",
    description: "",
    image: null,
    roomRegulation: {
      id: 3,
      maxGuest: 5,
      defaultGuest: 4,
      maxSurchargeRatio: 90,
      maxOverseaSurchargeRatio: 10,
      roomExchangeFee: 10,
    },
  });

  useState(() => {
    roomDetailService.getAll().then((data) => {
      setDetails(data);
      console.log(data[0]);
      setSelectedDetail(data[0]);
    });
  }, []);

  useEffect(() => {
    setSelectedDetail(SelectedDetail);
  }, [SelectedDetail]);

  const handleSelectedDetail = (e) => {
    if (e.target.value) {
      var selected_detail = details.find((x) => x.id == e.target.value);
      if (selected_detail) {
        setSelectedDetail(selected_detail);
        setDetailID(e.target.value);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await roomService
      .addRoom({
        id: id,
        status: status,
        note: note,
        roomDetailID: detailID,
      })
      .then((data) => {
        setID("");
        setStatus("");
        setNote("");
        alert("New Room successfully added");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title mt-5">Add Room</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div className="row formtype">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Room ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    onChange={(e) => setID(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>
                    <a href="#">Room Detail</a>{" "}
                  </label>
                  <select
                    className="form-control"
                    id="detail_id"
                    name="detail_id"
                    onChange={(e) => handleSelectedDetail(e)}
                  >
                    {details.map((x) => {
                      return (<option value={x.id} key={x.id}>{x.roomType}</option>)
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Maintaining</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Exchange Room Fee Ratio</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={SelectedDetail.roomRegulation.roomExchangeFee}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Room Type</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={SelectedDetail.roomType}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Base price</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SelectedDetail.price}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Standard Capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SelectedDetail.roomRegulation.defaultGuest}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Maximum Capacity</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SelectedDetail.roomRegulation.maxGuest}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Charges For Extra Customers</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SelectedDetail.roomRegulation.maxSurchargeRatio}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Charges For Foreign Guests</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      SelectedDetail.roomRegulation.maxOverseaSurchargeRatio
                    }
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Room change Fee</label>
                  <input
                    type="text"
                    className="form-control"
                    value={SelectedDetail.roomRegulation.roomExchangeFee}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={SelectedDetail.description}
                    disabled
                    readOnly
                  ></textarea>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Note</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="note"
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary buttonedit ml-2"
        id="btn-sendform"
        onClick={handleSubmit}
      >
        Create
      </button>
    </>
  );
}
