import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerHeader from "../admin/OwnerHeader";
import AddMedicine from "./AddMedicine";
const backendBase = import.meta.env.VITE_API_URL;

function AddMedicinePage() {
  const navigate = useNavigate();

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
    console.log("Submitting ");
    try {
      const res = await axios.post(`${backendBase}/API/medicine/create`, {
        name,
        uses,
        sideEffects,
        ingredients,
      });


      if(res.data.success) {
        navigate("/admin");
      }
    } catch (err) {
      console.log("Unable to add Medicine" + err);
    }
  };

  return (
    <>
      <AddMedicine
        name={name}
        setName={setName}
        newUse={newUse}
        setNewUse={setNewUse}
        uses={uses}
        addNewUse={addNewUse}
        updateUse={updateUse}
        deleteUse={deleteUse}
        newSideEffect={newSideEffect}
        setNewSideEffect={setNewSideEffect}
        sideEffects={sideEffects}
        addNewSideEffect={addNewSideEffect}
        updateSideEffect={updateSideEffect}
        deleteSideEffect={deleteSideEffect}
        newIngredientName={newIngredientName}
        setNewIngredientName={setNewIngredientName}
        newIngredientDescription={newIngredientDescription}
        setNewIngredientDescription={setNewIngredientDescription}
        newIngredientQuantity={newIngredientQuantity}
        setNewIngredientQuantity={setNewIngredientQuantity}
        ingredients={ingredients}
        addNewIngredient={addNewIngredient}
        updateIngredient={updateIngredient}
        deleteIngredient={deleteIngredient}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddMedicinePage;
