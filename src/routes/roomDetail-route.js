import AllRoomDetails from "@pages/roomDetails/index/allRoomDetails";
import AddRoomDetail from "@pages/roomDetails/index/addRoomDetails";
import EditRegulation from "@pages/roomRegulations/index/editRegulation";
import { Route, Routes } from "react-router-dom";

export default function  RoomDetailRoute() {
    return (
        <Routes>
            <Route index element={< AllRoomDetails/>} />
            <Route path='/add-room-detail' element={<AddRoomDetail/>}/>
            <Route path='/:id' element={<EditRegulation />}/>
        </Routes>
    )
}