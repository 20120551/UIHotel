import Reservation from "@pages/reservation/reservationcards";
import CreateReservation from "@pages/reservation/createReservation";
import { Route, Routes } from "react-router-dom";

export default function ReservationRoute() {
    return (
        <Routes>
            <Route index element={<Reservation />} />
            <Route path="/booking" element={<CreateReservation />} />
        </Routes>
    )
}