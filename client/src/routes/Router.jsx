import { createBrowserRouter } from "react-router";

import AddRestaurant from '../pages/AddRestaurant'
import Home from '../pages/Home'
import Update from '../pages/Update'
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotAllowed from "../pages/NotAllowed";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import Profile from "../pages/Profile";
import AdminAndModerator from "../pages/AdminAndModerator";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/update/:id",
        element: (
            <AdminAndModerator>
                <Update />
            </AdminAndModerator>
        )
    },
    {
        path: "/add",
        element: (
            <AdminPage>
                <AddRestaurant />
            </AdminPage>
        )
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/notallowed",
        element: <NotAllowed />
    },
    {
        path: "/profile",
        element: (
            <UserPage>
                <Profile />
            </UserPage>
        )
    }
])

export default router