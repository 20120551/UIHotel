
import RoomOccupancy from "@pages/roomOccupancy/roomOccupancy"
import { Route, Routes } from "react-router-dom";
export default function RoomOccupancyRoute() {
    return (
        <Routes>
            <Route index element={<RoomOccupancy />} />
      
        </Routes>
    )
}