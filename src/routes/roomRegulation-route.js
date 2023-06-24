import AllRegulations from "@pages/roomRegulations/index/allRegulations";
import { Route, Routes } from "react-router-dom";

export default function  RoomRegulationRoute() {
    return (
        <Routes>
            <Route index element={< AllRegulations/>} />
        </Routes>
    )
}