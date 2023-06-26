import AllRegulations from "@pages/roomRegulations/index/allRegulations";
import AddRegulation from "@pages/roomRegulations/index/addRegulations";
import EditRegulation from "@pages/roomRegulations/index/editRegulation";
import { Route, Routes } from "react-router-dom";

export default function  RoomRegulationRoute() {
    return (
        <Routes>
            <Route index element={< AllRegulations/>} />
            <Route path='/add-regulation' element={<AddRegulation/>}/>
            <Route path='/:id' element={<EditRegulation />}/>
        </Routes>
    )
}