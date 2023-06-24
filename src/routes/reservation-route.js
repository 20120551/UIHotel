import Reservation from "@pages/reservation/reservationcards";
import { Route, Routes } from "react-router-dom";

export default function ReservationRoute() {
    return (
        <Routes>
            <Route index element={<Reservation />} />
        </Routes>
    )
}