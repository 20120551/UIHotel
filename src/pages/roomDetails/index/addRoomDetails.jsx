import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomDetailService } from "@services";
import { roomRegulationService } from "@services";
import { useNavigate } from "react-router-dom";
import UploadImgComponent from "@components/image/uploadImg";
import UploadImage from "@lib/uploadImage";

function AddRoomDetail() {
  const [state, dispatch] = React.useState();
  const [regulationID, setRegulationID] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Image, setImage] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  React.useEffect(() => {
    roomRegulationService.getAll().then((roomRegulation) => {
      dispatch(setData(roomRegulation));
    });
  }, []);
  const handleSubmit = async (event) => {
    // event.preventDefault();
    let imgUrl = await UploadImage(Image);
    if (regulationID === undefined || regulationID === null || regulationID === "")
    {
      alert("Regulation id is required");
    }

    await roomDetailService
      .addRoomDetail({
        price: Price,
        roomType: roomType,
        description: Description,
        roomREgulationId: regulationID,
        image: imgUrl
      })
      .then((data) => {
        setDescription("");
        setPrice("");
        setRoomType("");
        setImage(null);
        setPreviewImage(null);
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
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title mt-5">Add Room Detail</h3>{" "}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form>
              <div className="row formtype">
                {/* <div className="col-md-4">
                                    <div className="form-group ">
                                        <label>Room </label>
                                        <input className="form-control" type="number" value="200000" /> </div>
                                </div> */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-control"
                    />{" "}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Room Type:</label>
                    <input
                      type="text"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="form-control"
                    />{" "}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                    />{" "}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Image:</label>
                    {/* <input
                      type="number"
                      value={Image}
                      onChange={(e) => setImage(e.target.value)}
                      className="form-control"
                    />{" "} */}
                    <UploadImgComponent img={[Image, setImage]} previewImg={[previewImage, setPreviewImage]}></UploadImgComponent>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Regulation ID:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={regulationID}
                      onChange={(e) => setRegulationID(e.target.value)}
                    >
                      <option>Select</option>
                      {state}
                    </select>{" "}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button type="button" className="btn btn-primary buttonedit ml-2">
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
          className="btn btn-primary buttonedit"
        >
          Add
        </button>
      </div>
    </>
  );
}
export default AddRoomDetail;
