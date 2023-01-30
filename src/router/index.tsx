import { createBrowserRouter } from "react-router-dom";
import HomeView from "@/views/HomeView";
import DefaultLayout from "@/layout/DefaultLayout";
import LoginPage from "@/views/LoginPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: 'home',
                element: <HomeView />,            
            }
        ],
    },
    {
        path: 'login',
        element: <LoginPage />
    }
]);
