import routesConfig from "config/route";

// // Layouts
// import { HomeLayout } from "layouts";

// Pages
import Home from "pages/";
import Invoice from "pages/invoices";
import Login from "pages/login.js";
import Room from "pages/room";

// Public routes
const publicRoutes = [
  { path: routesConfig.routes.home, component: Home, layout: null },
  { path: routesConfig.routes.login, component: Login },
];

// private routes
const privateRoutes = [
  { path: routesConfig.routes.invoice, component: Invoice, allowRoles: [] },
  { path: routesConfig.routes.room, component: Room, allowRoles: [] },
];

export { publicRoutes, privateRoutes };
