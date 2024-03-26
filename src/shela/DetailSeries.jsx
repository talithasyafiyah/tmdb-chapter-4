import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = "cb3ac09a4bda9ad72e532e4e4a98a517";

function DetailSeries() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);

  const detailSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data ", response.data);
      setDetail(response.data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };

  useEffect(() => {
    detailSeries();
    console.log(location);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-8">Detail Series</h2>
        {detail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {detail.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                  alt={detail.name}
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {detail.name}
              </h2>

              <p className="text-lg text-gray-400 mb-4">{detail.overview}</p>
              <p className="text-lg text-gray-400 mb-4">
                Rating{" "}
                <span role="img" aria-label="star" className="text-yellow-400">
                  ⭐️
                </span>
                : {detail.vote_average}
              </p>
              <p className="text-lg text-gray-400 mb-4">
                Seasons: {detail.number_of_seasons}
              </p>
              <p className="text-lg text-gray-400 mb-4">
                Episodes: {detail.number_of_episodes}
              </p>

              <div className="flex flex-wrap gap-2">
                <p className="text-lg text-gray-400 mb-2">Genres:</p>
                {detail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-primary/50 text-white px-3 py-2 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailSeries;
