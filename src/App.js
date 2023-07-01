import { Routes, Route } from "react-router-dom";
import { ProtectRoute } from "@components/authorization";
import { role } from "@config";
import { HomeLayout, UserLayout } from "layouts";
import InvoiceRoute from "routes/invoice-route";
import RoomRegulationRoute from "routes/roomRegulation-route";
import RevenueRoute from "routes/revenue-route";
import RoomPaying from "@pages/search/roomPaying";
import SearchRoute from "routes/search-route";
import Home from "@pages/home/home";
import RoomRoute from "routes/room-route";
import StaffRoute from "routes/staff-route";
import ReservationRoute from "routes/reservation-route";
import RoomOccupancyRoute from "routes/room-occupancy-route";
import RoomDetailRoute from "routes/roomDetail-route";
import DashBoardRoute from "routes/dashboard-route";
import HotelServiceRoute from "routes/hotelService-route";
import Login from "@pages/auth/login";
import Notfound from "@pages/error/notfound";
import ServerInterval from "@pages/error/serverInterval";
import Unauthorization from "@pages/error/unauthorization";
import NotFound from "@pages/error/notfound";
import Profile from "@pages/home/profile";
function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/hotel" element={<HomeLayout />}>
            <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
              <Route path="staff/*" element={<StaffRoute />} />
              <Route path="room-occupancy/*" element={<RoomOccupancyRoute />} />
              <Route path="revenue/*" element={<RevenueRoute />} />
            </Route>
            <Route path="room/*" element={<RoomRoute />} />
            <Route path="service/*" element={<HotelServiceRoute />} />
            <Route path="invoice/*" element={<InvoiceRoute />} />
            <Route path="reservation/*" element={<ReservationRoute />} />
            <Route path="room-detail/*" element={<RoomDetailRoute />} />
            <Route path="regulation/*" element={<RoomRegulationRoute />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<DashBoardRoute />} />
          </Route>
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="search/*" element={<SearchRoute />} />
          <Route path="payment" element={<RoomPaying />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="401" element={<Unauthorization />} />
        <Route path="404" element={<Notfound />} />
        <Route path="500" element={<ServerInterval />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
