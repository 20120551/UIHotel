import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from '@components/authorization';
import { role } from '@config';
import Login from '@pages/login';
import { HomeLayout, UserLayout } from 'layouts';
import InvoiceRoute from 'routes/invoice-route';
import InvoiceDetail from '@pages/invoices/detail';
import RoomPaying from '@pages/search/roomPaying';
import SearchRoute from 'routes/search-route';
import Home from '@pages/home/home';
import ReservationRoute from 'routes/reservation-route';

function App() {
    return (
        <>
            <Routes>
                <Route path='/hotel' element={<HomeLayout />} >
                    <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
                        <Route path='invoice/*' element={<InvoiceRoute />} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
                        <Route path='create' element={<InvoiceDetail />} />
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='unauthorized' element={<Unauthorization />} />
                    <Route path='reservation/*' element={<ReservationRoute />} />
                </Route>
            </Routes>

            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path='search/*' element={<SearchRoute />} />
                    <Route path='payment' element={<RoomPaying />} />
                </Route>
            </Routes>
        </>
    )
}

function Create() {
    return <h1>Create page</h1>
}
function Unauthorization() {
    return <h1>Unauthorization page</h1>
}

export default App;
