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

                <div class="page-wrapper">
                    <div class="content container-fluid">
                        <Outlet />
                    </div>
                </div>
            </Container >
            {/* <Footer /> */}
        </>
    );
}