import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from '@components/authorization';
import { role } from '@config';
import Login from '@pages/login';
import { HomeLayout } from 'layouts';
import InvoiceRoute from 'routes/invoice-route';
import InvoiceDetail from '@pages/invoices/detail';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomeLayout />} >
                    <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
                        <Route path='/invoice/*' element={<InvoiceRoute />} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
                        <Route path='/create' element={<InvoiceDetail />} />
                    </Route>
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
