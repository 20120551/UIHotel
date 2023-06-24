import Header from "@components/structure/header";
import Footer from "@components/structure/footer";
import SideBar from "@components/structure/sidebar";
import { Outlet } from "react-router-dom";

export function HomeLayout() {
    return (
        <>
            <Header />
            <SideBar />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}