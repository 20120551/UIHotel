import AllServices from "@pages/hotelService/allService";
import AddService from "@pages/hotelService/addService";
import { Route, Routes } from "react-router-dom";

export default function HotelServiceRoute() {
  return (
    <Routes>
      <Route index element={<AllServices />} />
      <Route path="/add-service" element={<AddService />} />
      {/* <Route path="/edit-room/:id" element={<EditRoom />} /> */}
    </Routes>
  );
}
