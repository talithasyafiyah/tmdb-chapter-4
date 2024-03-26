import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = "af37b503324b91c3940d26917c0251fc";

function HomePage() {
  let location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const movieDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("Detail data ", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    movieDetail();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* List Movie */}
      {!isLoading && (
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

                      <h1 className="text-lg font-semibold mt-6">Genres:</h1>
                      <div className="flex gap-2">
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
      )}
    </div>
  );
}

export default HomePage;
