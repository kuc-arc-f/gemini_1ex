import React, { useState, useEffect } from "react";
//import { Dialog } from "@headlessui/react";

const TodoDialog = ({ isOpen, isEdit, todo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publicType: "public",
    foodOrange: false,
    foodApple: false,
    foodBanana: false,
    pubDate1: "",
    pubDate2: "",
    pubDate3: "",
    qty1: "",
    qty2: "",
    qty3: "",
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        content: todo.content || "",
        publicType: todo.publicType || "public",
        foodOrange: todo.foodOrange || false,
        foodApple: todo.foodApple || false,
        foodBanana: todo.foodBanana || false,
        pubDate1: todo.pubDate1 || "",
        pubDate2: todo.pubDate2 || "",
        pubDate3: todo.pubDate3 || "",
        qty1: todo.qty1 || "",
        qty2: todo.qty2 || "",
        qty3: todo.qty3 || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        publicType: "public",
        foodOrange: false,
        foodApple: false,
        foodBanana: false,
        pubDate1: "",
        pubDate2: "",
        pubDate3: "",
        qty1: "",
        qty2: "",
        qty3: "",
      });
    }
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  //return "ret_Test";

  return (
    <div open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" />

        <div className="bg-white rounded-lg p-6 max-w-lg w-full z-50">
          <h3 className="text-lg font-bold mb-4">
            {isEdit ? "Edit Todo" : "Add Todo"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Public Type</label>
              <div>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="publicType"
                    value="public"
                    checked={formData.publicType === "public"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Public</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="publicType"
                    value="private"
                    checked={formData.publicType === "private"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Private</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Foods</label>
              <div className="flex">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name="foodOrange"
                    checked={formData.foodOrange}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Orange</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name="foodApple"
                    checked={formData.foodApple}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Apple</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="foodBanana"
                    checked={formData.foodBanana}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Banana</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="pubDate1" className="block text-gray-700 font-bold mb-2">
                Pub Date 1
              </label>
              <input
                type="date"
                id="pubDate1"
                name="pubDate1"
                value={formData.pubDate1}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pubDate2" className="block text-gray-700 font-bold mb-2">
                Pub Date 2
              </label>
              <input
                type="date"
                id="pubDate2"
                name="pubDate2"
                value={formData.pubDate2}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pubDate3" className="block text-gray-700 font-bold mb-2">
                Pub Date 3
              </label>
              <input
                type="date"
                id="pubDate3"
                name="pubDate3"
                value={formData.pubDate3}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="qty1" className="block text-gray-700 font-bold mb-2">
                Qty 1
              </label>
              <input
                type="text"
                id="qty1"
                name="qty1"
                value={formData.qty1}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="qty2" className="block text-gray-700 font-bold mb-2">
                Qty 2
              </label>
              <input
                type="text"
                id="qty2"
                name="qty2"
                value={formData.qty2}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="qty3" className="block text-gray-700 font-bold mb-2">
                Qty 3
              </label>
              <input
                type="text"
                id="qty3"
                name="qty3"
                value={formData.qty3}
                onChange={handleInputChange}
                className="border border-gray-400 px-3 py-2 rounded-md"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoDialog;