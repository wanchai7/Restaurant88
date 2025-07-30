import { createBrowserRouter } from "react-router";

import AddRestaurant from '../pages/AddRestaurant'
import Home from '../pages/Home'
import Update from '../pages/Update'
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/update/:id",
        element: <Update />
    },
    {
        path: "/add",
        element: <AddRestaurant />
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    }
])

export default router