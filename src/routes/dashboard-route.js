import AdminDashBoard from "@pages/dashBoard/adminDashBoard";
import StaffDashBoard from "@pages/dashBoard/staffDashBoard";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "@hooks/context-hooks";
export default function DashBoardRoute() {
    const [state, dispatch] = useAuth();
    return (
        <Routes>
            {state.role === "manager" ? 
                <Route index element={<AdminDashBoard/>} />
                :
                <Route index element={<StaffDashBoard/>} />
            }
        </Routes>
    )
}