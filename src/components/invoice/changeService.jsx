import { useService } from "@hooks/context-hooks";
import ServiceTable from "./serviceTable";
import { useEffect, useState } from "react";
import { hotelServiceService } from "@services/index";
import { service } from "@store/actions";
import { createNotification } from "@utls/notification";

export default function ChangeService({ handleChangeService }) {
    const [categoryId, setCategoryId] = useState("Room service");
    const [state, dispatch] = useService();

    useEffect(() => {
        hotelServiceService.getServiceByCategory({ categoryId })
            .then(data => {
                dispatch(service.getServiceByCategory({ services: data }))
            })
            .catch(err => {
                const { message = "", code = err.response?.data } = err.response?.data;
                createNotification({ type: "error", title: message, message: code });
            })
    }, [categoryId]);
    return (
        <>
            <div className="form-group m-2">
                <label>Category</label>
                <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="form-control" id="sel1" name="sellist1">
                    <option value="Room service">Room Service</option>
                    <option value="Drink">Drink</option>
                    <option value="Food">Food</option>
                </select>
            </div>
            <ServiceTable services={state.services} handleServiceChange={handleChangeService} />
        </>
    )
}