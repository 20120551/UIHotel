import { Route, Routes } from "react-router-dom";
import RoomDetail from "@pages/search/roomDetail";
import RoomResult from "@pages/search/roomResult";

export default function SearchRoute() {
    return (
        <Routes>
            <Route index element={<RoomResult />} />
            <Route path="/:id" element={<RoomDetail />} />
        </Routes>
    )
}