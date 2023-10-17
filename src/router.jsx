import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import Product from "./views/Product/product";
import Dashboard from "./views/dashboard";
import Defaultlayout from "./components/defaultlayout";
import Guestlayout from "./components/guestlayout";
import Notfound from "./views/notfound";
import CreateProduct from "./views/Product/createProduct";
import UpdateProduct from "./views/Product/updateProduct";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Defaultlayout />,
        children: [
            { 
                
                path: "/",
                element: <Navigate to="product" />
            },
            { 
                path: "/product",
                element: <Product />
            },
            { 

                path: "/product/create",
                element: <CreateProduct />
            },
            { 

                path: "/product/:productId",
                element: <UpdateProduct />
            },
            { 
                path: "/dashboard",
                element: <Dashboard />
            },
        ]
    },
    { 
        path: "/",
        element: <Guestlayout />,
        children: [
            { 
                path: "/login",
                element: <Login />
            },
            { 
                path: "/register",
                element: <Register />
            },
        ]
    },
   
    { 
        path: "*",
        element: <Notfound />
    },
])

export default router;