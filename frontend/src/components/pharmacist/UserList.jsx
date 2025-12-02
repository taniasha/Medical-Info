import axios from "axios";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import OwnerHeader from '../admin/OwnerHeader';
import { useNavigate } from "react-router-dom";

function UserList() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/API/user", {
          withCredentials: true,
        });

        setUserList(res.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    }

    getData();
  }, []);

  const handleExpert = (mobile) => {
    navigate("/pharmacist/chat-with-user", {
      state: mobile,
    });
  };
  return (
    <>
      <OwnerHeader />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <UserCircleIcon className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">User List</h2>
        </div>

        {userList.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userList.map((e, idx) => (
              <div
                key={idx}
                onClick={() => handleExpert(e.mobile)}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xl font-semibold text-indigo-700">
                    {e.name}
                  </p>
                  <span className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full mr-1 ${
                        e.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <span
                      className={`text-sm ${
                        e.status === "online"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {e.status === "online" ? "Online" : "Offline"}
                    </span>
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">📞 Mobile:</span> {e.mobile}
                  </p>
                  {/* <p className="text-gray-700">
                    <span className="font-medium">🕒 Available:</span>{" "}
                    {e.availableTime.start} – {e.availableTime.end}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserList;
