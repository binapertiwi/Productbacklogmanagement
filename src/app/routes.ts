import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { lazy } from "react";

// Lazy-load heavy page components so they are code-split into separate chunks.
// This means the browser only downloads what it needs for the current page,
// dramatically reducing the initial bundle size and time-to-interactive.
const InternalDashboard = lazy(() =>
  import("./components/InternalDashboard").then((m) => ({ default: m.InternalDashboard }))
);
const CustomerPortal = lazy(() =>
  import("./components/CustomerPortal").then((m) => ({ default: m.CustomerPortal }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: InternalDashboard },
      { path: "customer", Component: CustomerPortal },
    ],
  },
]);
