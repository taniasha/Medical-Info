import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OwnerHeader from "../admin/OwnerHeader";
const backendBase = import.meta.env.VITE_API_URL;

function PharmacistHome() {
  const [allMedicine, setAllMedicine] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      async function getData() {
        try {
          if (query !== "") {
            const res = await axios.get(`${backendBase}/API/medicine/search/${query}`);
            setAllMedicine(res.data);
          } else {
            const res = await axios.get("/API/medicine");

            if (res.data.success) {
              setAllMedicine(res.data.allMedicine);
            } else {
              alert(res.data.message);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }

      getData();
    }, 500); // delay in ms

    return () => {
      clearTimeout(delayDebounce); // cancel debounce
    };
  }, [query]);

  const handleMedicine = (id) => {
    navigate(`/medicine/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <OwnerHeader />

      {/* Search Section */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">Medicine List</h2>
          <button
            onClick={() => navigate("/pharmacist/user-list")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow"
          >
            Go to the Chat Section
          </button>
        </div>

        <div className="relative mt-4 mb-6">
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full p-3 pl-4 pr-10 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          )}
        </div>

        {/* Medicine Cards */}
        {allMedicine.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No medicines available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMedicine
              // .filter((medicine) => medicine.name.toLowerCase().startsWith(query))
              .map((medicine) => (
                <div
                  key={medicine._id}
                  onClick={() => handleMedicine(medicine._id)}
                  className="cursor-pointer bg-white p-5 rounded-xl border shadow-sm hover:shadow-lg hover:border-blue-500 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {medicine.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Click for more details
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PharmacistHome;
