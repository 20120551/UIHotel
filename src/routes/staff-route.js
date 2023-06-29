import AllStaff from "@pages/staff/allStaff";
import AddStaff from "@pages/staff/addStaff";
import EditStaff from "@pages/staff/editStaff";
import { Route, Routes } from "react-router-dom";

export default function StaffRoute() {
  return (
    <Routes>
      <Route index element={<AllStaff />} />
      <Route path="/add-staff" element={<AddStaff />} />
      <Route path="/edit-staff/:id" element={<EditStaff />} />
    </Routes>
  );
}
