import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import RootLayout from '../RootLayout/RootLayout';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import Profile from '../Pages/Profile/Profile';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import MainDashboard from '../Pages/DashboardPages/MainDashboard';
import AddProducts from '../Pages/DashboardPages/AddProducts';
import ManageProducts from '../Pages/DashboardPages/ManageProducts';
import UpdateProduct from '../Pages/DashboardPages/UpdateProduct';
import AllUsers from '../Pages/DashboardPages/AllUsers';
import PrivateRoutes from './PrivateRoutes';
import AllProducts from '../Pages/AllProducts/AllProducts';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import MyOrders from '../Pages/MyOrders/MyOrders';
import BookingForm from '../Pages/BookingPage/BookingPage';
import AboutUs from '../Components/AboutUs/AboutUs';

import PaymentSuccess from '../Pages/PaymentSuccess/PaymentSuccess';
import PendingOrders from '../Pages/DashboardPages/PendingOrders';
import OrderDetails from '../Pages/DashboardPages/OrderDetails';
import ApprovedOrders from '../Pages/DashboardPages/ApprovedOrders/ApprovedOrders';
import TrackOrder from '../Pages/DashboardPages/AddTracking';
import AddTracking from '../Pages/DashboardPages/AddTracking';
import ViewTracking from '../Pages/DashboardPages/ViewTracking';
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import MyTracking from '../Pages/DashboardPages/MyTracking';
import UserDashboard from '../Pages/DashboardPages/UserDashboard';
import DashboardRouter from '../Pages/DashboardPages/DashboardRouter';
import ManagerDashboard from '../Pages/DashboardPages/ManagerDashboard';
import ManagerLandingPage from '../Pages/DashboardPages/ManagerLandingPage';
import BuyerLandingPage from '../Pages/DashboardPages/BuyerLandingPage';
import AllProductsTable from '../Pages/DashboardPages/AllProductsTable';
import ContactUs from '../Components/ContactUs/ContactUs';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/all-products',
                element: <AllProducts></AllProducts>
            },
            {
                path: '/product/:id',
                element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>
            },
            {
                path: '/booking/:id',
                element: <PrivateRoutes><BookingForm></BookingForm></PrivateRoutes>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/payment-success',
                element: <PrivateRoutes><PaymentSuccess></PaymentSuccess></PrivateRoutes>
            },
            {
                path: '/my-orders',
                element: <PrivateRoutes><MyOrders></MyOrders></PrivateRoutes>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: '',
                element: <DashboardRouter></DashboardRouter>
            },
            {
                path: 'admin',
                element: <MainDashboard></MainDashboard>
            },
            {
                path: 'manager',
                element: <ManagerLandingPage></ManagerLandingPage>
            },
            {
                path: 'user',
                element: <BuyerLandingPage></BuyerLandingPage>
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
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>

            },
            {
                path: 'all-products',
                element: <AllProductsTable></AllProductsTable>

            },
            {
                path: 'my-orders',
                element: <MyOrders></MyOrders>

            },
            {
                path: 'pending-orders',
                element: <PendingOrders></PendingOrders>

            },
            {
                path: 'order/:id',
                element: <OrderDetails></OrderDetails>

            },
            {
                path: 'approved-orders',
                element: <ApprovedOrders></ApprovedOrders>

            },
            {
                path: 'add-tracking/:order_id',
                element: <AddTracking></AddTracking>

            },
            {
                path: 'view-tracking/:order_id',
                element: <ViewTracking></ViewTracking>

            },
            {
                path: 'my-tracking',
                element: <MyTracking></MyTracking>

            },
        ]
    }
]);



export default router;