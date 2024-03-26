import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./talitha/MovieDetails";
import SearchMovie from "./deo/searchMovie";

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
    {
      path: "/search-movie",
      element: <SearchMovie />,
    },
  ]);

  return <RouterProvider router={router} />;
}
