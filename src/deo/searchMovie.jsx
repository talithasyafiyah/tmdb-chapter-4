import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
const API_KEY = "90d28258049b01d1ed78d2ae59e2222f";

export default function searchMovie() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  const searchMovies = async () => {
    try {
      //   if (query.trim().length === 0) return alert("Mohon inputkan movie");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`,
        { header: { accept: "application/json" } }
      );

      console.log("cek", response.data);
      setMovies(response.data.results);
      setTotalPage(response.data.total_pages);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const change = (e) => {
    setQuery(e.target.value);
  };
  const goToNextPage = (e) => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = (e) => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    searchMovies();
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <div className="container mt-28 mb-20">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white font-bold text-2xl ">Movie Hub</p>
          {/* inputan */}
          <div className="">
            <form onSubmit={submit} className="flex justify-center mx-3">
              <input
                type="text"
                placeholder="Search Movie"
                value={query}
                onChange={change}
                className=" rounded-xl h-8 bg-[#33333A] text-white w-96 px-2"
              />
            </form>
          </div>
          <div className="flex justify-center items-center gap-2 mt-5 ">
            {totalPages > 1 && (
              <>
                {/* Prev Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1
                      ? "bg-red-300"
                      : "bg-primary hover:bg-primary/50"
                  } rounded-full px-2 py-2 text-white font-semibold `}
                >
                  <svg
                    className="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    stroke-width="1.5"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </button>
                {/* Next Button */}
                <p className="text-white text-center ">
                  {currentPage}/{totalPages}
                </p>
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
                    className="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    stroke-width="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mt-2">
            {movies.map((movie) => (
              // card
              <div
                className=" w-44 cursor-pointer hover:shadow-lg hover:rounded-xl hover:shadow-primary/50"
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } });
                }}
              >
                <img
                  className="rounded-xl h-64 "
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <div className="mx-2 mt-3 text-white">
                  <div className="font-bold truncate">{movie.title}</div>
                  <div className="flex justify-between">
                    <div>{movie.release_date}</div>
                    <div className="flex justify-between items-center gap-2 ">
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

                      <div>{movie?.vote_average?.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
