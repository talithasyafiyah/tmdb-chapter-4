import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./talitha/HomePage";
import MovieDetails from "./talitha/MovieDetails";
import SearchMovie from "./deo/searchMovie";
import TopRatedMovies from "./Andrysm06/TopRatedMovies";
import PeopleList from "./Rafi/PeopleList";
import DetailSeries from "./shela/DetailSeries";
import ListTvSeries from "./shela/ListTvSeries";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movie-details",
      element: <MovieDetails />,
    },
    {
      path: "/search-movie",
      element: <SearchMovie />,
    },
    {
      path: "/people-list",
      element: <PeopleList />,
    },
    {
      path: "/tv-details",
      element: <DetailSeries />,
    },
    {
      path: "/tv-list",
      element: <ListTvSeries />,
    },
    {
      path: "/top-rated-movies",
      element: <TopRatedMovies />,
    },
  ]);

  return <RouterProvider router={router} />;
}
