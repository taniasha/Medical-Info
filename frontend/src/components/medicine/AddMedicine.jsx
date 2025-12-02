import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerHeader from "../admin/OwnerHeader.jsx";

export default function AddMedicine({
  name,
  setName,
  newUse,
  addNewUse,
  setNewUse,
  updateUse,
  deleteUse,
  uses,
  sideEffects,
  newSideEffect,
  setNewSideEffect,
  addNewSideEffect,
  updateSideEffect,
  deleteSideEffect,
  newIngredientName,
  setNewIngredientName,
  newIngredientDescription,
  setNewIngredientDescription,
  newIngredientQuantity,
  setNewIngredientQuantity,
  addNewIngredient,
  ingredients,
  handleSubmit,
}) {
  return (
    <>
      <OwnerHeader />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Add Medicine
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Medicine Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Uses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uses
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newUse}
                  onChange={(e) => setNewUse(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addNewUse}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {uses.map((use, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    {use}
                    <div className="space-x-3 text-sm">
                      <button
                        onClick={() => updateUse(idx)}
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteUse(idx)}
                        type="button"
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Effects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Side Effects
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSideEffect}
                  onChange={(e) => setNewSideEffect(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addNewSideEffect}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {sideEffects.map((sideEffect, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    {sideEffect}
                    <div className="space-x-3 text-sm">
                      <button
                        onClick={() => updateSideEffect(idx)}
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteSideEffect(idx)}
                        type="button"
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients
              </label>
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newIngredientDescription}
                  onChange={(e) => setNewIngredientDescription(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newIngredientQuantity}
                  onChange={(e) => setNewIngredientQuantity(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={addNewIngredient}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Add Ingredient
              </button>

              <ul className="mt-4 space-y-2">
                {ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {ingredient.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ingredient.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {ingredient.quantity}
                      </p>
                    </div>
                    <div className="space-x-3 text-sm">
                      <button
                        onClick={() => updateIngredient(idx)}
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteIngredient(idx)}
                        type="button"
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Medicine
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
