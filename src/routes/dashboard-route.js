import AdminDashBoard from "@pages/dashBoard/adminDashBoard";
import { Route, Routes } from "react-router-dom";
export default function DashBoardRoute() {
    return (
        <Routes>
            <Route index element={<AdminDashBoard/>} />

        </Routes>
    )
}