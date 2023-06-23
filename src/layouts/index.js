// import Container from "@components/structure/container";
import Container from "@components/structure/container";
import Header from "@components/structure/header";
import SideBar from "@components/structure/sidebar";

export function HomeLayout({ children }) {
  return (
    <>
      <Container>
        <Header />
        <SideBar />
        <div className="page-wrapper">
          <div className="content container-fluid">{children}</div>
        </div>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
