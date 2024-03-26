import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
              <h1 className="text-white text-3xl font-semibold mb-8">
                Welcome to Movie List
              </h1>
              <a
                href="#movie"
                className="bg-primary rounded-full px-12 py-3 text-white font-semibold hover:bg-primary/40"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* List Movie */}
      <section id="movie" className="container mt-60 mb-16">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-white">Movie List</h1>
            <div className="flex gap-2 items-center">
              {/* Prev Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "bg-red-300"
                    : "bg-primary hover:bg-primary/50"
                } rounded-full px-2 py-2 text-white font-semibold`}
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
              <p className="text-white text-center">
                {currentPage}/{totalPages}
              </p>
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
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              navigate("/search-movie");
            }}
          >
            <p className="text-white font-normal text-base cursor-pointer hover:text-primary hover:font-semibold">
              Discover more movies
            </p>
            <svg
              className="h-4 w-4 fill-primary cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
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
                <div className="pt-3 pb-2 px-3">
                  <div className="flex flex-col justify-between">
                    <div className="min-h-8">
                      <p className="text-sm font-bold leading-tight line-clamp-2">
                        {e.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 justify-between">
                      <p className="text-sm font-normal">{e.release_date}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="#FFD43B"
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />
                          </svg>
                        </div>

                        <div className="text-sm font-semibold">
                          {e?.vote_average?.toFixed(1)}
                        </div>
                      </div>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
