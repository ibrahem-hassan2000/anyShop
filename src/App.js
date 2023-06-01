import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/HandelFooter/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import HeaderNav from "./components/HeaderNav";
import Product from "./pages/Product";
import Login from "./pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const Layout = () => {
  return (
    <>
      <HeaderNav />
      <main
        style={{ minHeight: "calc(100vh - 360px)" }}
        className="container mx-auto px-2 mb-16 my-2 flex"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ],
  },
  {
    path: "/",
    element: <div>About</div>,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
position="top-left"
autoClose={5000}
limit={6}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}

export default App;
