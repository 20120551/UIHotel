import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { roomRegulationService } from "@services";
import { useRoomRegulation } from "@hooks/context-hooks";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditRegulation() {

    let { id } = useParams();

    const [state, dispatch] = React.useState("");
    const isRoomRegulationValid = state?.length === 0 ? true : false;
    const [idr, setID] = React.useState("");
    const [roomExchangeFee, setRoomExchangeFee] = React.useState("");
    const [maximumGuests, setMaximumGuests] = React.useState("");
    const [defaultGuest, setDefaultGuets] = React.useState("");
    const [maxSurchargeRatio, setMaxSurchargeRatio] = React.useState("");
    const [maxOverseaSurchargeRatio, setMaxOverseaSurchagreRatio] = React.useState("");
    React.useEffect(() => {
        roomRegulationService.getByID({ index: id }).then(roomRegulation => {
            dispatch(roomRegulation);
            if (roomRegulation?.length !== 0) {
                console.log(roomRegulation);
                setID(id);
                setDefaultGuets(roomRegulation.defaultGuest)
                setMaxOverseaSurchagreRatio(roomRegulation.maxOverseaSurchargeRatio)
                setMaxSurchargeRatio(roomRegulation.maxSurchargeRatio)
                setMaximumGuests(roomRegulation.maxGuest)
                setRoomExchangeFee(roomRegulation.roomExchangeFee)
            }
            else {
                console.log('haha');
                alert("Invalid room regulation id");
                navigate("/regulation");
            }
        }).catch(error => {
            alert("Invalid room regulation id")
            navigate("/regulation")
        });
    }, [idr]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        // event.preventDefault();
        await roomRegulationService.addRoomRegulation({
            roomExchangeFee: roomExchangeFee,
            maxGuest: maximumGuests,
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
        console.log("haha");

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

                                <div class="col-md-4">
                                    <div class="form-group ">
                                        <label>ID </label>
                                        <input
                                            disabled
                                            value={idr}
                                            onChange={(e) => setID(e.target.value)}
                                            class="form-control" type="number" /> </div>
                                </div>
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
                <button type="button" class="btn btn-primary buttonedit ml-2"><Link to="/regulation" relative="">Cancel</Link></button>
                <button type="button" onClick={() => handleSubmit()} class="btn btn-primary buttonedit">Add</button>
            </div>
        </>
    );
}
export default EditRegulation