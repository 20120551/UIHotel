
import Revenue from "@pages/revenue/revenue"
import { Route, Routes } from "react-router-dom";
export default function RevenueRoute() {
    return (
        <Routes>
            <Route index element={<Revenue />} />
      
        </Routes>
    )
}