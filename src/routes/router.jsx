import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddEvent from "../pages/AddEvent";
import EditEvent from "../pages/EditEvent";
import Login from "../pages/Login";
import PrivateRouter from "../middlewares/PrivateRouter";
import PublicRouter from "../middlewares/PublicRouter";
import AppShell from "../components/AppShell";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <PrivateRouter><AppShell /></PrivateRouter>,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/add-event",
                element: <AddEvent />
            },
            {
                path: "/edit-event/:id",
                element: <EditEvent />
            },
        ]
    },

    {
        path: "/login",
        element: <PublicRouter><Login /></PublicRouter>
    },
]);
