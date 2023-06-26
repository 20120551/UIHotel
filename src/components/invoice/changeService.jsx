import { useService } from "@hooks/context-hooks";
import ServiceTable from "./serviceTable";
import { useEffect, useState } from "react";
import { hotelServiceService } from "@services/index";
import { service } from "@store/actions";

export default function ChangeService({ handleChangeService }) {
    const [categoryId, setCategoryId] = useState("1");
    const [state, dispatch] = useService();

    useEffect(() => {
        hotelServiceService.getServiceByCategory({ categoryId })
            .then(data => dispatch(service.getServiceByCategory({ services: data })));
    }, [categoryId]);
    return (
        <>
            <div className="form-group m-2">
                <label>Category</label>
                <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="form-control" id="sel1" name="sellist1">
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                </select>
            </div>
            <ServiceTable services={state.services} handleServiceChange={handleChangeService} />
        </>
    )
}