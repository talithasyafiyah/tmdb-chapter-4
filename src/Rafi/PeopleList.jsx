import react, { useEffect, useState } from "react";
export default function PeopleList() {
  const [data, setData] = useState([]);

  async function fetchdatawithasyncawait() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/changes?api_key=0389f7dff3b6002ad073a6a720cee29b"
      );
      if (!response.ok) {
        throw new error("failed to fetch data");
      }
      const items = await response.json();
      console.log("data received with async/await", data);
      setData(items);
    } catch (error) {
      console.error("Error", error);
    }
  }
  useEffect(() => {
    fetchdatawithasyncawait();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">People List</h1>
        {peopleList.map((e) => (
          <div key={e.id} className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="text-lg font-bold mb-1">{e?.name}</div>
            <div className="text-sm mb-1">{e?.known_for_department}</div>
            <div className="text-sm mb-1">{e?.original_name}</div>
            <div className="text-sm">{e?.popularity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
