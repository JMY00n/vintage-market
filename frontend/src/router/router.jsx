import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import ProductForm from "../pages/ProductForm/ProductForm";
import ErrorModal from "../components/error/ErrorModal";

export const router = createBrowserRouter([
    { path: "/", element: <Home />},
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp />},
    { path: "/products/form", element: <ProductForm />},
    { path: "/products/:id", element: <ProductDetailPage />},
]);
