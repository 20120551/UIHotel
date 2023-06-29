import AllRoom from "@pages/room/allRoom";
import AddRoom from "@pages/room/addRoom";
import EditRoom from "@pages/room/editRoom";
import { Route, Routes } from "react-router-dom";

export default function RoomRoute() {
  return (
    <Routes>
      <Route index element={<AllRoom />} />
      <Route path="/add-room" element={<AddRoom />} />
      <Route path="/edit-room/:id" element={<EditRoom />} />
    </Routes>
  );
}
