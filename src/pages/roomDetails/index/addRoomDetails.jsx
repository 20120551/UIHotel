import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomDetailService } from "@services";
import { useNavigate } from "react-router-dom";

function AddRoomDetail() {
    const [Price, setPrice] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Image, setDefaultGuets] = React.useState("");
    const [maxSurchargeRatio, setMaxSurchargeRatio] = React.useState("");
    const [maxOverseaSurchargeRatio, setMaxOverseaSurchagreRatio] = React.useState("");

    const handleSubmit = async (event) => {
        // event.preventDefault();
        await roomDetailService.addRoomDetail({
            Price: Price,
            maxGuest: Description,
            maxOverseaSurchargeRatio: maxOverseaSurchargeRatio,
            maxSurchargeRatio: maxSurchargeRatio,
            Image: Image
        }).then(data => {

            setDefaultGuets("");
            setMaxOverseaSurchagreRatio("");
            setDescription("");
            setPrice("");
            setMaxSurchargeRatio("");
            alert("New room Room Detail successfully added");


        }).catch(function (error) {
            console.log(error);
        })


    }
    return (
        <>
            <div class="content container-fluid">
                <div class="page-header">
                    <div class="row align-items-center">
                        <div class="col">
                            <h3 class="page-title mt-5">Add Room Detail</h3> </div>
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
                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Description:</label>
                                        <input
                                            type="number"
                                            value={Description}
                                            onChange={(e) => setDescription(e.target.value)}

                                            class="form-control" /> </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Image:</label>
                                        <input
                                            type="number"
                                            value={Image}
                                            onChange={(e) => setDefaultGuets(e.target.value)}

                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Image:</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select> </div>
                                </div>
   
                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="btn btn-primary buttonedit ml-2"><Link to="/Room Detail" relative="">Cancel</Link></button>
                <button type="button" onClick={() => handleSubmit()} class="btn btn-primary buttonedit">Add</button>
            </div>
        </>
    );
}
export default AddRoomDetail