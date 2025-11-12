import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import MainLayout from "../MainLayout/MainLayout";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import AllMovies from "../Pages/All-Movies/AllMovies";
import MyCollection from "../Pages/My-Collection/MyCollection";
import AddMovie from "../Pages/AddMovie/AddMovie";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import FilterMovies from "../Pages/Filter/FilterMovies";
import Watchlist from "../Pages/Watchlist/Watchlist";
import UpdateMovie from "../Pages/UpdateMovie/UpdateMovie";

const Home = lazy(() => import("../Pages/Home/Home"));
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
        path: "/movies",
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
        path: "/movies/add",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <AddMovie />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/movies/my-collection",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <MyCollection />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/movies/update/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <UpdateMovie />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/movies/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MovieDetails />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
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
            <PrivateRoute>
             <ForgotPassword />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
