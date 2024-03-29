import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomDetailService } from "@services";
import { roomRegulationService } from "@services";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UploadImgComponent from "@components/image/uploadImg";
import UploadImage from "@lib/uploadImage";
import { createNotification } from "@utls/notification";

function EditRoomDetail() {
    let { id } = useParams();

    const [state, dispatch] = React.useState();
    const [roomDetailID, setRoomDetailID] = React.useState("");
    const [regulationID, setRegulationID] = React.useState("");
    const [roomType, setRoomType] = React.useState("");
    const [Price, setPrice] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Image, setImage] = React.useState("");
    const [newImage, setNewImage] = React.useState(null);
    const [previewImage, setPreviewImage] = React.useState(null);

    React.useEffect(() => {
        roomDetailService.getByID({ index: id }).then(roomDetail => {
            setRegulationID(roomDetail.roomRegulation.id);
            setRoomDetailID(roomDetail.id)
            setPrice(roomDetail.price)
            setDescription(roomDetail.description)
            setImage(roomDetail.image)
            setRoomType(roomDetail.roomType)
        }).catch(err => {
            const { message = "", code = err.response?.data } = err.response?.data;
            createNotification({ type: "error", title: message, message: code });
        })
        roomRegulationService.getAll().then(roomRegulation => {
            dispatch(setData(roomRegulation));
            console.log(roomRegulation);
        }).catch(err => {
            const { message = "", code = err.response?.data } = err.response?.data;
            createNotification({ type: "error", title: message, message: code });
        })
    }, []);
    const handleSubmit = async (event) => {
        // event.preventDefault();
        let imgUrl = await UploadImage(newImage);
        let img = Image;
        if (imgUrl != null) {
            img = imgUrl;
        }

        await roomDetailService.updateRoomDetail({
            id: roomDetailID,
            price: Price,
            roomType: roomType,
            description: Description,
            image: img,
            roomRegulationID: regulationID

        }).then(roomDetail => {
            alert("room detail was successfully updated");
        }).catch(err => {
            const { message = "", code = err.response?.data } = err.response?.data;
            createNotification({ type: "error", title: message, message: code });
        })


    }
    const setData = (data) => {
        const results = [null];
        data.forEach((employee, index) => {
            results.push(
                <option key={index}>{employee.id}</option>
            );
        });
        return results;
    }

    return (
        <>
            <div class="content container-fluid">
                <div class="page-header">
                    <div class="row align-items-center">
                        <div class="col">
                            <h3 class="page-title mt-5">Edit Room Detail</h3> </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <form>
                            <div class="row formtype">


                                <div class="col-md-3">
                                    <div class="form-group ">
                                        <label>Room Detail ID: </label>
                                        <input
                                            disabled
                                            type="number"
                                            value={roomDetailID}
                                            onChange={(e) => setRoomDetailID(e.target.value)}
                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Price:</label>
                                        <input
                                            type="number"
                                            value={Price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Room Type:</label>
                                        <input
                                            type="text"
                                            value={roomType}
                                            onChange={(e) => setRoomType(e.target.value)}
                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Description:</label>
                                        <input
                                            type="text"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}

                                            class="form-control" /> </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Old image</label>
                                        <img src={Image} class="rounded" alt={roomDetailID} style={{ maxHeight: '400px' }} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Image:</label>
                                        <UploadImgComponent img={[newImage, setNewImage]} previewImg={[previewImage, setPreviewImage]}></UploadImgComponent>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Regulation ID:</label>
                                        <select class="form-control" id="exampleFormControlSelect1" value={regulationID} onChange={(e) => setRegulationID(e.target.value)}>
                                            {state}
                                        </select> </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="btn btn-primary buttonedit ml-2"><Link style={{ fontStyle: "none", color: "white" }} to="/hotel/room-detail" relative="path">Cancel</Link></button>
                <button type="button" onClick={() => handleSubmit()} class="btn btn-primary buttonedit">Confirm</button>
            </div>
        </>
    );
}
export default EditRoomDetail