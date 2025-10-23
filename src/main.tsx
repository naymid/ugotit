import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import AuthPage from "@/pages/Auth.tsx";
import ProductPage from "@/pages/ProductPage.tsx";
import AccessoryPage from "@/pages/AccessoryPage.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import AllScooters from "./pages/AllScooters.tsx";
import WarrantyPage from "./pages/WarrantyPage.tsx";
import ShippingPage from "./pages/ShippingPage.tsx";
import Auth from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Terms from "./pages/Terms.tsx";
import Cookies from "./pages/Cookies.tsx";
import Header from "./pages/Header.tsx";
import Contact from "./pages/Contact.tsx";
import Success from "./pages/Success";
import "./types/global.d.ts";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function RouterWrapper() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RouterWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scooters",
        element: <AllScooters />,
      },
      {
        path: "/scooter/:id",
        element: <ProductPage />,
      },
      {
        path: "/accessory/:id",
        element: <AccessoryPage />,
      },
      {
        path: "/warranty",
        element: <WarrantyPage />,
      },
      {
        path: "/shipping",
        element: <ShippingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/cookies",
        element: <Cookies />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/header",
        element: <Header />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <App />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);