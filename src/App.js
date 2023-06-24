import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from '@components/authorization';
import { role } from '@config';
import Login from '@pages/login';
import { HomeLayout } from 'layouts';
import InvoiceRoute from 'routes/invoice-route';
import RoomRegulationRoute from 'routes/roomRegulation-route';
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomeLayout />} >
                    <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
                        <Route path='/invoice/*' element={<InvoiceRoute />} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.STAFF]} />}>
                        <Route path='/create' element={<Create />} />
                    </Route>
                    
                    <Route path='/all-regulations' element={<RoomRegulationRoute/>}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/unauthorized' element={<Unauthorization />} />
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
