import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { lazy } from "react";

// Lazy-load heavy page components so they are code-split into separate chunks.
const InternalDashboard = lazy(() =>
  import("./components/InternalDashboard").then((m) => ({ default: m.InternalDashboard }))
);
const CustomerPortal = lazy(() =>
  import("./components/CustomerPortal").then((m) => ({ default: m.CustomerPortal }))
);
const LoginScreen = lazy(() =>
  import("./components/LoginScreen").then((m) => ({ default: m.LoginScreen }))
);
const UnitDetailPage = lazy(() =>
  import("./components/UnitDetailPage").then((m) => ({ default: m.UnitDetailPage }))
);
const InspectorProductivity = lazy(() =>
  import("./components/InspectorProductivity").then((m) => ({ default: m.InspectorProductivity }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: InternalDashboard },
      { path: "customer", Component: CustomerPortal },
      { path: "login", Component: LoginScreen },
      { path: "unit/:serialNumber", Component: UnitDetailPage },
      { path: "inspector", Component: InspectorProductivity },
    ],
  },
]);
