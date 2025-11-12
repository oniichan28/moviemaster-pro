import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import MainLayout from "../MainLayout/MainLayout";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import AllMovies from "../Pages/All-Movies/AllMovies";
import MyCollection from "../Pages/My-Collection/MyCollection";
import MyAdd from "../Pages/My Add/MyAdd";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";


const Home = lazy(() => import("../Pages/Home/Home"));
const ServiceDetails = lazy(() => import("../Pages/MovieDetails/MovieDetails"));
const Profile = lazy(() => import("../Pages/My-Collection/MyCollection"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Signup = lazy(() => import("../Pages/Signup/Signup"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
        loader: async () => {
          const res = await fetch("http://localhost:3000/movies");
          return res.json();
        },
      },
      {
        path: "/all-movies",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
           
              <AllMovies />
            
          </Suspense>
        ),
        loader: async () => {
          const res = await fetch("http://localhost:3000/movies");
          return res.json();
        },
      },
      {
        path: "/movies/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            
              <MovieDetails />
            
          </Suspense>
        ),
        loader: async () => {
          const res = await fetch("http://localhost:3000/movies/:id");
          return res.json();
        },
      },
      {
        path: "/movies/my-collection",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MyCollection />
          </Suspense>
        ),
      },
      {
        path: "/movies/add",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MyAdd />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PublicRoute>
              <Login />
            </PublicRoute>
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PublicRoute>
              <Signup />
            </PublicRoute>
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
