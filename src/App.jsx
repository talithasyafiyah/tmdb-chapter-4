import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./talitha/MovieDetails";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/movie-details",
      element: <MovieDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}
