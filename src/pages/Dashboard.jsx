import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { usePrivateProperties } from "../context/PrivatepropertyContext";
import PropertyFormModal from "../components/PropertyFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import api from "../api";

export default function Dashboard() {
  const { properties, fetchProperties } = usePrivateProperties();
  const { user } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/properties/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Property deleted successfully!");
      fetchProperties();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              My Properties
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage and track all your property listings
            </p>
          </div>
          <button
            onClick={() => { setEditProperty(null); setShowForm(true); }}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Property
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{properties.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${properties.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Price</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${properties.length > 0 ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length).toLocaleString() : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden group">
                  {p.images?.[0] ? (
                    <img
                      src={`${p.images[0]}`}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">${p.price?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {p.title}
                  </h2>
                  
                  {p.location && (
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {p.location}
                    </div>
                  )}

                  <p className="text-gray-500 text-sm mb-2">
                    🛏️ {p.bedrooms} | 🛁 {p.bathrooms}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => { setEditProperty(p); setShowForm(true); }}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(p._id)}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center mt-6">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No properties yet</h3>
              <p className="text-gray-600 mb-6">
                Start building your portfolio by adding your first property listing
              </p>
              <button
                onClick={() => { setEditProperty(null); setShowForm(true); }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                Add Your First Property
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <PropertyFormModal
          onClose={() => setShowForm(false)}
          editData={editProperty}
          refresh={fetchProperties}
        />
      )}
      {deleteId && (
        <DeleteConfirmModal
          onClose={() => setDeleteId(null)}
          onConfirm={() => { handleDelete(deleteId); setDeleteId(null); }}
        />
      )}
    </div>
  );
}
