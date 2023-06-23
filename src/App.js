import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from './components/authorization';
import { role } from './config';
import Login from './pages/login';
import Header from './components/structure/header/header';
import Footer from './components/structure/footer/footer';
import SideBar from '@components/structure/sidebar/sidebar';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<ProtectRoute allowRoles={[role.STAFF]} />}>
                    <Route path='/create' element={<Create />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/unauthorized' element={<Unauthorization />} />
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
function Home() {
    return (
        <>
            <Header />
            <SideBar />
            {/* <Footer /> */}
        </>
    )
}

export default App;
