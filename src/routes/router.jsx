import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import UpdateTask from "../pages/UpdateTask";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/updatetask/:id',
                element: <PrivateRoute><UpdateTask /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://127.0.0.1:5000/updatetask/${params.id}`)
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    // {
    //     path: '/success',
    //     element: <Success />,
    // },
    // {
    //     path: '*',
    //     element: <ErrorPage />,
    // },
]);