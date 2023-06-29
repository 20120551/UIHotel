import AdminDashBoard from "@pages/dashBoard/adminDashBoard";
import StaffDashBoard from "@pages/dashBoard/staffDashBoard";
import { Route, Routes } from "react-router-dom";
export default function DashBoardRoute() {
    return (
        <Routes>
            <Route index element={<AdminDashBoard/>} />
            <Route path="/staff-dashboard" element={<StaffDashBoard/>}/>
        </Routes>
    )
}