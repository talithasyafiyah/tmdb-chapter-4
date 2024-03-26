import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "af37b503324b91c3940d26917c0251fc";

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-white mb-6">Movie List</h1>
          <div>
            {/* Prev Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-red-300"
                  : "bg-primary hover:bg-primary/50"
              } rounded-full px-2 py-2 text-white font-semibold mr-2`}
            >
              <svg
                class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                stroke-width="1.5"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </button>
            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "bg-red-200"
                  : "bg-primary hover:bg-primary/50"
              } rounded-full px-2 py-2 text-white font-semibold`}
            >
              <svg
                class="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                stroke-width="1.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>
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
