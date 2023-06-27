import Header from "@components/structure/header";
import SideBar from "@components/structure/sidebar";
import UserHeader from "@components/user/header";
import UserFooter from "@components/user/foorter";
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

export function UserLayout() {
    return (
        <>
            <UserHeader />
            <Outlet />
            <UserFooter />
        </>
    );
}