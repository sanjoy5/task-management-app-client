import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import UpdateTask from "../pages/UpdateTask";
import AddTask from "../pages/AddTask";



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
                path: '/addtask',
                element: <PrivateRoute><AddTask /></PrivateRoute>,
            },
            {
                path: '/updatetask/:id',
                element: <PrivateRoute><UpdateTask /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://task-management-app-server-eight.vercel.app/updatetask/${params.id}`)
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