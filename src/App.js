import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "routes";
import { Fragment } from "react";
import { ProtectRoute } from "@components/authorization";
import { role } from "@config/role";
import Login from "@pages/login";
import { HomeLayout } from "layouts";
import InvoiceRoute from "routes/invoice-route";

function App() {
  // config route trong routes/index.js

  return (
    <Routes>
      {/* pubblic routes */}
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = HomeLayout;

        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}

      {/*need autheticate routes */}
      {privateRoutes.map((route, index) => {
        const Page = route.component;
        let Layout = HomeLayout;

        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }

        return (
          <Route element={<ProtectRoute allowRoles={[role.MANAGER]} />}>
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          </Route>
        );
      })}
    </Routes>
  );
}

export default App;
