import Container from "@components/structure/container";
import Header from "@components/structure/header";
import SideBar from "@components/structure/sidebar";
import { Outlet } from "react-router-dom";

export function HomeLayout() {
    return (
        <>
            <Header />
            <Container>
                <SideBar />
                <div className="col-10 d-inline-block">
                    <Outlet />
                </div>
            </Container>
            {/* <Footer /> */}
        </>
    );
}