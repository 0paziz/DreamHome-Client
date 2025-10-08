import { useState, useContext, useEffect } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrEditProperty() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // if editing
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    type: "house",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch existing property if editing
  useEffect(() => {
    if (isEdit) {
      const fetchProperty = async () => {
        try {
          const res = await api.get(`/properties/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setForm({
            title: res.data.title,
            price: res.data.price,
            location: res.data.location,
            description: res.data.description || "",
            type: res.data.type || "house",
          });
        } catch (err) {
          console.error("Error fetching property:", err);
          alert("Failed to load property for editing");
        }
      };
      fetchProperty();
    }
  }, [id, isEdit, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) return alert("Unauthorized. Please log in.");

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    for (const img of images) fd.append("images", img);

    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/properties/${id}`, fd, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Property updated successfully!");
      } else {
        await api.post("/properties", fd, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Property added successfully!");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Error saving property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isEdit ? "Edit Property" : "Add Property"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
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
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Property"
            : "Add Property"}
        </button>
      </form>
    </div>
  );
}
