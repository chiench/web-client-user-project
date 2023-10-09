import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import User from "./views/User/user";
import Dashboard from "./views/dashboard";
import Defaultlayout from "./components/defaultlayout";
import Guestlayout from "./components/guestlayout";
import Notfound from "./views/notfound";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Defaultlayout />,

        children: [
            { 
                
                path: "/",
                element: <Navigate to="users" />
            },
            { 

                path: "/users",
                element: <User />
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