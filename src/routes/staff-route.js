import AllStaff from "@pages/staff/allStaff";
import { Route, Routes } from "react-router-dom";

export default function StaffRoute() {
  return (
    <Routes>
      <Route index element={<AllStaff />} />
      {/* <Route path="/add-room" element={<AddRoom />} /> */}
    </Routes>
  );
}
