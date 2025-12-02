import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserHeader from "../user/UserHeader";

export default function OrderMedicine() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);

  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const addMedicine = () => {
    if (newName && newQuantity) {
      setMedicines((prev) => [
        ...prev,
        { name: newName, quantity: newQuantity },
      ]);
      setNewName("");
      setNewQuantity("");
    }
  };

  const onSubmit = async (data) => {
    if (medicines.length > 0) {
      const res = await axios.post("/API/user/medicine/order", {
        ...data,
        medicines,
      });

      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: "Mail sent successfully",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(-1);
        });
      }
    }
  };

  const updateMedicine = (idx) => {
    setNewName(medicines[idx].name);
    setNewQuantity(medicines[idx].quantity);
    setMedicines(medicines.filter((prev, id) => id !== idx));
  };

  const deleteMedicine = (idx) => {
    setMedicines(medicines.filter((prev, id) => id !== idx));
  };

  return (
    <>
    <UserHeader/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Order Medicine
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="order"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="order"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="mt-2 flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="medicine"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    id="medicine"
                    name="medicine"
                    type="text"
                    value={newName} // controlled by local state
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={newQuantity} // controlled by local state
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                        addMedicine();
                      }
                    }}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="mt-5 flex-1">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={addMedicine}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <ul className="space-y-4">
                  {medicines.map((medicine, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          Name:{" "}
                          <span className="text-gray-700">{medicine.name}</span>
                        </p>
                        <p className="text-gray-900">
                          Quantity:{" "}
                          <span className="text-gray-700">
                            {medicine.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => updateMedicine(idx)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMedicine(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
