import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomDetailService } from "@services";
import { roomRegulationService } from "@services";
import { useNavigate } from "react-router-dom";

function AddRoomDetail() {
  const [state, dispatch] = React.useState();
  const [regulationID, setRegulationID] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Image, setImage] = React.useState("");

  React.useEffect(() => {
    roomRegulationService.getAll().then((roomRegulation) => {
      dispatch(setData(roomRegulation));
      console.log(roomRegulation);
    });
  }, []);
  const handleSubmit = async (event) => {
    // event.preventDefault();
    await roomDetailService
      .addRoomDetail({
        price: Price,
        roomType: roomType,
        description: Description,
        roomREgulationId: regulationID,
        image: Image,
      })
      .then((data) => {
        setDescription("");
        setPrice("");
        setRoomType("");
        setImage("");
        alert("New Room Detail successfully added");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const setData = (data) => {
    const results = [null];
    data.forEach((employee, index) => {
      results.push(<option key={index}>{employee.id}</option>);
    });
    return results;
  };

  return (
    <>
      <div class="content container-fluid">
        <div class="page-header">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="page-title mt-5">Add Room Detail</h3>{" "}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <form>
              <div class="row formtype">
                {/* <div class="col-md-4">
                                    <div class="form-group ">
                                        <label>Room </label>
                                        <input class="form-control" type="number" value="200000" /> </div>
                                </div> */}
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                      class="form-control"
                    />{" "}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Room Type:</label>
                    <input
                      type="text"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      class="form-control"
                    />{" "}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      class="form-control"
                    />{" "}
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Image:</label>
                    <input
                      type="number"
                      value={Image}
                      onChange={(e) => setImage(e.target.value)}
                      class="form-control"
                    />{" "}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Reservation ID:</label>
                    <select
                      class="form-control"
                      id="exampleFormControlSelect1"
                      value={regulationID}
                      onChange={(e) => setRegulationID(e.target.value)}
                    >
                      {state}
                    </select>{" "}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button type="button" class="btn btn-primary buttonedit ml-2">
          <Link
            style={{ fontStyle: "none", color: "white" }}
            to="/hotel/room-detail"
            relative="path"
          >
            Cancel
          </Link>
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          class="btn btn-primary buttonedit"
        >
          Add
        </button>
      </div>
    </>
  );
}
export default AddRoomDetail;
