import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomService } from "@services/index";
import { roomDetailService } from "@services/index";
export default function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [status, setStatus] = useState("");
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

  useEffect(() => {
    roomDetailService
      .getAll()
      .then((detailList) => {
        setDetails(detailList);
      })
      .then(() => {
        roomService.getRoomDetail({ id }).then((thisRoom) => {
          //   console.log(thisRoom);

          setDetailID(parseInt(thisRoom.detail.id));
          setSelectedDetail(thisRoom.detail);
          setStatus(thisRoom.status);
          setNote(thisRoom.note);
        });
      });
  }, []);

  const handleSelectedDetail = (e) => {
    if (e.target.value) {
      var selected_detail = details.find(
        (x) => x.id == parseInt(e.target.value)
      );
      if (selected_detail) {
        setSelectedDetail(selected_detail);
        setDetailID(e.target.value);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await roomService
      .editRoom({
        id: id,
        status: status,
        note: note,
        roomDetailID: detailID,
      })
      .then((data) => {
        alert("Changed successfully");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handelDelete = async (e) => {
    //  e.preventDefault();
    let warning = `Are you sure remove room id ${id}`;
    if (confirm(warning) != true) {
      return;
    }
    await roomService
      .deleteRoom(id)
      .then(() => {
        alert(`Successfully remove room id ${id}`);
        navigate(`/hotel/room`);
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
            <h3 className="page-title mt-5">Edit Room #{id}</h3>
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
                    readOnly
                    value={id}
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
                      return (
                        <option value={x.id} key={x.id}>
                          {x.roomType}
                        </option>
                      );
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
                    value={status}
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
                    defaultValue={note}
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
        className="ml-2 btn btn-primary buttonedit"
        id="btn-sendform"
        onClick={handleSubmit}
      >
        Save
      </button>
      <button
        type="submit"
        className="mr-2  btn btn-danger float-right"
        style={{ height: "45px" }}
        onClick={handelDelete}
      >
        Deactivate
      </button>
    </>
  );
}
