import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../user/UserHeader";
const backendBase = import.meta.env.VITE_API_URL;

function MedicineDetail() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [uses, setUses] = useState([]);
  const [sideEffects, setSideEffects] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${backendBase}/API/medicine/${id}`);
        setName(res.data.name);
        setUses(res.data.uses);
        setSideEffects(res.data.sideEffects);
        setIngredients(res.data.ingredients);
      } catch (err) {
        console.error("Error fetching medicine details:", err);
      }
    }
    getData();
  }, [id]);

  return (
  <div className="min-h-screen bg-gray-50">
    <Header />

    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">{name}</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed information about this medicine</p>
        </div>

        {/* Uses */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🩺 Uses</h3>
          {uses.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {uses.map((use, idx) => (
                <li key={idx} className="text-base">{use}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No uses available.</p>
          )}
        </section>

        {/* Side Effects */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">⚠️ Side Effects</h3>
          {sideEffects.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {sideEffects.map((effect, idx) => (
                <li key={idx} className="text-base">{effect}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No side effects listed.</p>
          )}
        </section>

        {/* Ingredients */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🧪 Ingredients</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-left font-medium">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient) => (
                    <tr key={ingredient._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{ingredient.name}</td>
                      <td className="px-4 py-3 text-gray-600">{ingredient.description}</td>
                      <td className="px-4 py-3 text-gray-600">{ingredient.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-gray-500 italic">
                      No ingredients available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            ← Back to List
          </button>
        </div>
      </div>
    </main>
  </div>
);


}

export default MedicineDetail;
