import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import RootLayout from '../RootLayout/RootLayout';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import MainDashboard from '../Pages/DashboardPages/MainDashboard';
import AddProducts from '../Pages/DashboardPages/AddProducts';
import ManageProducts from '../Pages/DashboardPages/ManageProducts';
import UpdateProduct from '../Pages/DashboardPages/UpdateProduct';


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>

            },
            {
                path: '/register',
                element: <RegistrationPage></RegistrationPage>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '',
                element: <MainDashboard></MainDashboard>
            },
            {
                path: 'add-product',
                element: <AddProducts></AddProducts>

            },
            {
                path: 'manage-product',
                element: <ManageProducts></ManageProducts>

            },
            {
                path: 'update-product/:id',
                element: <UpdateProduct></UpdateProduct>

            },
        ]
    }
]);



export default router;