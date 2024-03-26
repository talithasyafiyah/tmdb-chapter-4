import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "cb3ac09a4bda9ad72e532e4e4a98a517";

function ListTvSeries() {
  const [search, setSearch] = useState("");
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const listSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPage}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setSeries(response.data.results);
      setFilteredSeries(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

  useEffect(() => {
    listSeries();
  }, [currentPage]);

  useEffect(() => {
    const filtered = series.filter((series) =>
      series.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSeries(filtered);
  }, [search, series]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col items-center justify-center mt-14">
          <h2 className="text-white text-2xl font-bold ms-4">TV Series List</h2>
          <input
            type="text"
            placeholder="Search for a series"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 rounded-md p-2 text-white mb-4 mt-5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
          {filteredSeries.map((series) => (
            <div
              key={series.id}
              className="relative w-full cursor-pointer overflow-hidden rounded-md text-white shadow-lg hover:shadow-primary/50 hover:shadow-lg"
              onClick={() => {
                navigate("/tv-details", { state: { id: series.id } });
              }}
            >
              {series.poster_path && (
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.name}
                    className="w-full object-cover h-60"
                  />
                  <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white py-2 px-4">
                    <span
                      role="img"
                      aria-label="star"
                      className="text-yellow-400"
                    >
                      ⭐️
                    </span>
                    {series.vote_average}{" "}
                  </p>
                </div>
              )}
              <h2 className="text-white text-lg font-semibold p-2">
                {series.name}
              </h2>
            </div>
          ))}
        </div>

        <div className="flex mt-4 justify-center mb-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="bg-gray-800 text-white py-2 px-4 rounded-l-lg hover:bg-primary/50"
          >
            Previous Page
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-800 text-white py-2 px-4 rounded-r-lg hover:bg-primary/50"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListTvSeries;
