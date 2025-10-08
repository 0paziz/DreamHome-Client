import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function PropertyFormModal({ onClose, editData, refresh }) {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState(
    editData || {
      title: "",
      price: "",
      type: "",
      location: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      images: [],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((img) => formData.append("images", img));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const method = editData ? "PUT" : "POST";
      const url = editData
        ? `${import.meta.env.VITE_APP_API_URL}/api/properties/${editData._id}`
        : `${import.meta.env.VITE_APP_API_URL}/api/properties`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });

      if (res.ok) {
        toast.success(`Property ${editData ? "updated" : "added"} successfully!`);
        refresh();
        onClose();
      } else {
        toast.error("Error saving property");
      }
    } catch {
      toast.error("Failed to connect to server");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[90%] md:w-[500px] space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editData ? "Edit Property" : "Add New Property"}
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {/* 🛏️ Bedrooms */}
        <input
          type="number"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
          className="w-full border p-2 rounded"
          min="0"
          required
        />

        {/* 🛁 Bathrooms */}
        <input
          type="number"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
          className="w-full border p-2 rounded"
          min="0"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded h-24 resize-none"
          required
        />

        {/* Images */}
        <input
          type="file"
          multiple
          onChange={(e) =>
            setForm({ ...form, images: Array.from(e.target.files) })
          }
          className="w-full border p-2 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
