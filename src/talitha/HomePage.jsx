import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "af37b503324b91c3940d26917c0251fc";

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[240px] w-full md:h-[400px] lg:h-[428px]">
        <div className="absolute top-0 w-full h-screen flex items-center justify-center">
          <img src="images/hero.gif" className="w-full h-screen object-cover" />
          <div className="absolute top-0 left-0 w-full h-screen bg-black/75 flex items-center justify-center">
            <div className="text-center px-40">
              <p className="text-white text-3xl font-semibold mb-8">
                Welcome to Movie List
              </p>
              <a
                href="#movie"
                className="bg-primary rounded-full px-12 py-3 text-white font-semibold"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* List Movie */}
      <section id="movie" className="container mt-60 mb-20">
        <div className="flex">
          <h1 className="text-lg font-bold text-white mb-6">Movie List</h1>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {Array.isArray(data) ? (
            data.map((e) => (
              <div
                key={e.id}
                className="w-full cursor-pointer h-full  overflow-hidden rounded-md text-white shadow-lg hover:shadow-primary/50 hover:shadow-lg"
                onClick={() => {
                  navigate("/movie-details", { state: { id: e.id } });
                }}
              >
                <img
                  className="w-full object-cover h-60"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  alt={e.title}
                />
                <div className="py-3 px-2">
                  <div className="flex flex-col justify-between">
                    <div className="min-h-8">
                      <p className="text-sm font-bold leading-tight line-clamp-2">
                        {e.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Data is not available or is not in the expected format.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
