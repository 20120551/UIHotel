import Reservation from "@pages/reservation/reservationcards";
import CreateReservation from "@pages/reservation/createReservation";
import EditReservation from "@pages/reservation/editReservationCard";
import DetailReservation from "@pages/reservation/detailReservationCard";
import { Route, Routes } from "react-router-dom";

export default function ReservationRoute() {
    return (
        <Routes>
            <Route index element={<Reservation />} />
            <Route path="/:id" element={<DetailReservation/>} />
            <Route path="/booking" element={<CreateReservation />} />
            <Route path="/edit/:id" element={<EditReservation />} />
        </Routes>
    )
}