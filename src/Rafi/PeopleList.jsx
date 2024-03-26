import react, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function PeopleList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const peopleList = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=0389f7dff3b6002ad073a6a720cee29b&page=${currentPage}&language=en-US`,
        { headers: { accept: "application/json" } }
      );
      console.log("People data ", response.data);
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    peopleList();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="container px-4 my-20">
        <div>
          <h1 className="text-4xl text text-center text-red-500 font-semibold pb-4">
            People List
          </h1>
        </div>
        <div className="flex gap-2 items-center px-12 py-2 justify-center">
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
        <div className="grid grid-cols-4 gap-5 px-12 py-2">
          {data.map((e) => (
            <div
              key={e.id}
              className="w-full overflow-hidden rounded-md text-white shadow-lg border border-primary hover:shadow-primary/50 hover:shadow-lg"
            >
              {e.profile_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                  className="w-full object-cover h-60 "
                />
              ) : (
                <img
                  src="images/profile2.jpg"
                  className="w-full object-cover h-60 "
                />
              )}
              <div className="py-4">
                <div className="text-xl font-bold text-center mb-4 py-2">
                  {e?.name}
                </div>
                <div className="text-sm text-red-500 text-center  mb-1">
                  {e?.known_for_department}
                </div>
                <div className="text-sm text-center mb-1">
                  {e?.original_name}
                </div>
                <div className="text-sm text-center">{e?.popularity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
