import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    type: "house",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    for (const img of images) fd.append("images", img);

    try {
      await api.post("/properties", fd, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/properties");
    } catch (err) {
      alert("Error adding property");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Property
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          value={form.type}
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="land">Land</option>
        </select>

        <input
          type="file"
          multiple
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setImages([...e.target.files])}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
