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
const UnitDetailPage = lazy(() =>
  import("./components/UnitDetailPage").then((m) => ({ default: m.UnitDetailPage }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: InternalDashboard },
      { path: "customer", Component: CustomerPortal },
      { path: "unit/:serialNumber", Component: UnitDetailPage },
    ],
  },
]);
