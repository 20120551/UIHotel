import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomRegulationService } from "@services";
import { useRoomRegulation } from "@hooks/context-hooks";

import { useNavigate } from "react-router-dom";

function AddRegulation() {
    const [roomExchangeFee, setRoomExchangeFee] = React.useState("");
    const [maximumGuests, setMaximumGuests] = React.useState("");
    const [defaultGuest, setDefaultGuets] = React.useState("");
    const [maxSurchargeRatio, setMaxSurchargeRatio] = React.useState("");
    const [maxOverseaSurchargeRatio, setMaxOverseaSurchagreRatio] = React.useState("");

    const handleSubmit = async (event) => {
        // event.preventDefault();
        await roomRegulationService.addRoomRegulation({
            roomExchangeFee: roomExchangeFee,
            maxGuest: maximumGuests,
            maxOverseaSurchargeRatio:maxOverseaSurchargeRatio,
            maxSurchargeRatio: maxSurchargeRatio,
            defaultGuest: defaultGuest
        }).then(data => {

            setDefaultGuets("");
            setMaxOverseaSurchagreRatio("");
            setMaximumGuests("");
            setRoomExchangeFee("");
            setMaxSurchargeRatio("");
            alert("New room regulation successfully added");


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
                            <h3 class="page-title mt-5">Add Regulation</h3> </div>
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
                                        <label>Room Exchange Fee:</label>
                                        <input
                                            type="number"
                                            value={roomExchangeFee}
                                            onChange={(e) => setRoomExchangeFee(e.target.value)}
                                            class="form-control" /> </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Maximum Guests:</label>
                                        <input
                                            type="number"
                                            value={maximumGuests}
                                            onChange={(e) => setMaximumGuests(e.target.value)}

                                            class="form-control" /> </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Default Guests:</label>
                                        <input
                                            type="number"
                                            value={defaultGuest}
                                            onChange={(e) => setDefaultGuets(e.target.value)}

                                            class="form-control" /> </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Max Surcharge Ratio:</label>
                                        <input
                                            type="number"
                                            value={maxSurchargeRatio}
                                            onChange={(e) => setMaxSurchargeRatio(e.target.value)}

                                            class="form-control" /> </div>
                                </div>



                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Max Oversea Surcharge Ratio:</label>
                                        <input class="form-control"
                                            type="number"
                                            value={maxOverseaSurchargeRatio}
                                            onChange={(e) => setMaxOverseaSurchagreRatio(e.target.value)}

                                        /> </div>
                                </div>



                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="btn btn-primary buttonedit ml-2"><Link style={{ fontStyle: "none", color: "white" }} to="/hotel/regulation" relative="">Cancel</Link></button>
                <button type="button" onClick={() => handleSubmit()} class="btn btn-primary buttonedit">Add</button>
            </div>
        </>
    );
}
export default AddRegulation