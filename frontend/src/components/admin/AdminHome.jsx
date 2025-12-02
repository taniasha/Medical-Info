import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OwnerHeader from "./OwnerHeader";
import GeneralModal from "../pages/GeneralModal";

function AdminHome() {
  const navigate = useNavigate();

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [medicineDeleteID, setMedicineDeleteID] = useState();
  const [allMedicine, setAllMedicine] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/API/medicine", {
          withCredentials: true,
        });

        if (res.data.success) {
          setAllMedicine(res.data.allMedicine);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/API/medicine/${id}`);

      if (res.data.success) {
        setAllMedicine((prevAllMedicine) =>
          prevAllMedicine.filter((medicine) => medicine._id !== id)
        );
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerHeader />

      <GeneralModal
        open={isModelOpen}
        setOpen={setIsModelOpen}
        title="delete medicine"
        message="Are you sure you want to Delete Medicine? This action cannot be undone."
        onConfirm={() => {
          handleDelete(medicineDeleteID);
          setIsModelOpen(false);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">Medicine List</h2>
          <button
            onClick={() => navigate("/admin/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow"
          >
            ➕ Add Medicine
          </button>
          <button
            onClick={() => navigate("/admin/pharmacist/add")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow"
          >
            ➕ Add Phaarmacist
          </button>
        </div>

        {allMedicine.length === 0 ? (
          <p className="text-center text-gray-500">No medicines available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMedicine.map((medicine) => (
              <div
                key={medicine._id}
                onClick={() => navigate(`/medicine/${medicine._id}`)}
                className="cursor-pointer bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {medicine.name}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Click to view details
                </p>

                <div className="flex justify-end gap-4 mt-auto text-sm text-blue-600">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(medicine._id);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Update
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setMedicineDeleteID(medicine._id);
                      setIsModelOpen(true);
                      // handleDelete(medicine._id);
                    }}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminHome;
