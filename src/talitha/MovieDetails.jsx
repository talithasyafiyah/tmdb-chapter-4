import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = "af37b503324b91c3940d26917c0251fc";

function HomePage() {
  let location = useLocation();
  const [data, setData] = useState([]);

  const movieDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("Detail data ", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    console.log("location", location);
    movieDetail();
  }, []);

  console.log("dataa", data);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* List Movie */}
      <section>
        <div className="mt-60" key={data?.title}>
          <div className="absolute top-0 w-full h-screen flex items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              className="w-full h-screen object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center">
              <div className="container">
                <div className="flex gap-6 mt-12 items-center">
                  <div className="w-1/4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                      className="!w-[500px] object-cover rounded-lg shadow-primary shadow-lg"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between text-white">
                    <div className="flex flex-col">
                      <p className="text-4xl font-bold mb-4">{data?.title}</p>
                      <div className="w-full h-0.5 bg-gradient-to-r from-white"></div>
                      <p className="mt-4 mb-4">{data?.overview}</p>
                      <h1 className="text-lg font-semibold mt-6">
                        Production Companies:
                      </h1>
                      <ul className="list-disc text-white font-normal text-base ps-4 mt-4">
                        {data?.production_companies &&
                          data?.production_companies.map((e) => (
                            <li>{e?.name}</li>
                          ))}
                      </ul>
                    </div>

                    <h1 className="text-lg font-semibold mt-6">
                      Genres:
                    </h1>
                    <div className="flex gap-4">
                      {data?.genres &&
                        data?.genres.map((e) => (
                          <p className="text-white font-normal text-base mt-2">
                            <div className="bg-primary rounded-full px-4 py-0.5">
                              {e?.name}
                            </div>
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
