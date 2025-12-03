import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const backendBase = import.meta.env.VITE_API_URL;

export default function AddMedicine() {
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  let { id } = useParams();

  // Name
  const [name, setName] = useState("");

  // Use
  const [uses, setUses] = useState([]);
  const [newUse, setNewUse] = useState("");

  // Side Effect
  const [sideEffects, setSideEffects] = useState([]);
  const [newSideEffect, setNewSideEffect] = useState("");

  // Ingredient
  const [ingredients, setIngredients] = useState([]);

  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientDescription, setNewIngredientDescription] = useState("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${backendBase}/API/medicine/${id}`);

      setName(res.data.name);
      setUses(res.data.uses);
      setSideEffects(res.data.sideEffects);
      setIngredients(res.data.ingredients);
    }

    getData();
  }, []);

  const addNewSideEffect = () => {
    if (newSideEffect.trim()) {
      // Prevents empty entries
      setSideEffects((prevSideEffects) => [
        ...prevSideEffects,
        newSideEffect.trim(),
      ]);
      setNewSideEffect("");
    }
  };

  const deleteUse = (idx) => {
    setUses((uses) => uses.filter((prevUses, id) => id != idx));
  };

  const updateUse = (idx) => {
    setNewUse(uses[idx]);
    setUses((uses) => uses.filter((prevUses, id) => id != idx));
  };

  const deleteSideEffect = (idx) => {
    setSideEffects((sideEffects) =>
      sideEffects.filter((prevSideEffects, id) => id != idx)
    );
  };

  const updateSideEffect = (idx) => {
    setNewSideEffect(sideEffects[idx]);
    setSideEffects((sideEffects) =>
      sideEffects.filter((prevSideEffects, id) => id != idx)
    );
  };

  const updateIngredient = (idx) => {
    setNewIngredientName(ingredients[idx].name);
    setNewIngredientDescription(ingredients[idx].description);
    setNewIngredientQuantity(ingredients[idx].quantity);

    setIngredients((ingredients) =>
      ingredients.filter((prevIngredients, id) => id != idx)
    );
  };

  const deleteIngredient = (idx) => {
    setIngredients((ingredients) =>
      ingredients.filter((prevIngredients, id) => id != idx)
    );
  };

  const addNewUse = () => {
    if (newUse.trim()) {
      setUses((prevUses) => [...prevUses, newUse.trim()]);
      setNewUse("");
    }
  };

  const addNewIngredient = () => {
    if (newIngredientName.trim() && newIngredientDescription.trim()) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          name: newIngredientName,
          description: newIngredientDescription,
          quantity: newIngredientQuantity,
        },
      ]);
    }

    setNewIngredientName("");
    setNewIngredientDescription("");
    setNewIngredientQuantity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/API/medicine/${id}`, {
        name,
        uses,
        sideEffects,
        ingredients,
      });

      navigate("/admin");
    } catch (err) {
      console.log("Unable to update Medicine" + err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Medicine
          </h2>
        </div>

        {/* Name */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Uses  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="uses"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Uses
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <input
                  id="uses"
                  name="uses"
                  type="text"
                  value={newUse}
                  onChange={(e) => setNewUse(e.target.value)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={addNewUse}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <ul>
                  {uses.map((use, idx) => (
                    <li key={idx}>
                      {use}
                      <button
                        type="button"
                        className="ml-4 text-indigo-600 hover:text-indigo-800"
                        onClick={() => updateUse(idx)}
                      >
                        update
                      </button>
                      <button
                        type="button"
                        className="ml-4 text-indigo-600 hover:text-indigo-800"
                        onClick={() => deleteUse(idx)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side Effects  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="side_effect"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Side Effects
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <input
                  id="side_effect"
                  name="side_effect"
                  type="text"
                  value={newSideEffect}
                  onChange={(e) => setNewSideEffect(e.target.value)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={addNewSideEffect}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <ul>
                  {sideEffects.map((sideEffect, idx) => (
                    <li key={idx}>
                      {sideEffect}
                      <button
                        type="button"
                        className="ml-4 text-indigo-600 hover:text-indigo-800"
                        onClick={() => updateSideEffect(idx)}
                      >
                        update
                      </button>
                      <button
                        type="button"
                        className="ml-4 text-indigo-600 hover:text-indigo-800"
                        onClick={() => deleteSideEffect(idx)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ingredient"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredients
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="ingredient-name"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    id="ingredient-name"
                    name="ingredient-name"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                    type="text"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="ingredient-description"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <input
                    id="ingredient-description"
                    name="ingredient-description"
                    value={newIngredientDescription}
                    onChange={(e) =>
                      setNewIngredientDescription(e.target.value)
                    }
                    type="text"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="ingredient-quantity"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <input
                    id="ingredient-quantity"
                    name="ingredient-quantity"
                    value={newIngredientQuantity}
                    onChange={(e) => setNewIngredientQuantity(e.target.value)}
                    type="number"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="mt-5 flex-1">
                  <button
                    type="button"
                    onClick={addNewIngredient}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <ul className="space-y-4">
                  {ingredients.map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          Name:{" "}
                          <span className="text-gray-700">
                            {ingredient.name}
                          </span>
                        </p>
                        <p className="text-gray-900">
                          Description:{" "}
                          <span className="text-gray-700">
                            {ingredient.description}
                          </span>
                        </p>
                        <p className="text-gray-900">
                          Quantity:{" "}
                          <span className="text-gray-700">
                            {ingredient.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-800"
                          onClick={() => updateIngredient(idx)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => deleteIngredient(idx)}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
