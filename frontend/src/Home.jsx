import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import UserHeader from "./components/user/UserHeader";
import { SocketContext } from "./components/context/SocketContext";

function Home() {
  const [allMedicine, setAllMedicine] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const mySocket = useContext(SocketContext);
  const location = useLocation();

  const mobile = location.state;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      async function getData() {
        try {
          if (query !== "") {
            const res = await axios.get(`/API/medicine/search/${query}`);
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

  useEffect(() => {
    if (mySocket != null) {
      const socketId = mySocket.id;
      mySocket.emit('save-id',{ mobile, socketId});
      mySocket.on('get-id', mobile);
      // mySocket.on('send-id', (id) => {
      //   console.log("Reissssssssss Id: " + id);
      // });
    }

    return () => {
      if (mySocket != null) {
        mySocket.off();
      }
    };
  }, [mySocket]);

  const handleMedicine = (id) => {
    navigate(`/medicine/${id}`);
  };

  const createMedicine = () => {
    navigate("/admin/create");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* UserHeader */}
      <UserHeader />

      {/* Search Section */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="relative mb-6">
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

export default Home;
