import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import ErrorPage from "../pages/errorPage";
import Index from "../pages";
import UserIndex from "../pages/users";
import UserCreate from "../pages/users/create";
import AuthLayout from "../pages/auth/authLayout";
import Login from "../pages/auth/login";
import ChangePassword from "../pages/auth/changePassword";
import UserEdit from "../pages/users/edit";
import ProfileIndex from "../pages/profile";
import BrandIndex from "../pages/brands";
import BrandEdit from "../pages/brands/edit";
import BrandCreate from "../pages/brands/create";
import CategoryIndex from "../pages/categories";
import CategoryCreate from "../pages/categories/create";
import CategoryEdit from "../pages/categories/edit";
import ClassifyIndex from "../pages/classifies";
import ClassifyCreate from "../pages/classifies/create";
import ClassifyEdit from "../pages/classifies/edit";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "users",
                children: [
                    {
                        index: true,
                        element: <UserIndex />,
                    },
                    {
                        path: "create",
                        element: <UserCreate />,
                    },
                    {
                        path:":userId/edit",
                        element:<UserEdit/>,
                    }
                ]
            },
            {
                path: "brands",
                children: [
                    {
                        index: true,
                        element: <BrandIndex />,
                    },
                    {
                        path: "create",
                        element: <BrandCreate />,
                    },
                    {
                        path:":brandId/edit",
                        element:<BrandEdit/>,
                    }
                ]
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        element: <CategoryIndex />,
                    },
                    {
                        path: "create",
                        element: <CategoryCreate />,
                    },
                    {
                        path:":categoryId/edit",
                        element:<CategoryEdit />,
                    }
                ]
            },
            {
                path: "classifies",
                children: [
                    {
                        index: true,
                        element: <ClassifyIndex />,
                    },
                    {
                        path: "create",
                        element: <ClassifyCreate />,
                    },
                    {
                        path:":classifyId/edit",
                        element:<ClassifyEdit />,
                    }
                ]
            },
            {
                path:"profile",
                element:<ProfileIndex/>
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/confirm-account",
                element: <ChangePassword />,
            }
        ]
    },
])

export default router;