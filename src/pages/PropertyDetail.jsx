import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, DollarSign, Home, Calendar, Maximize } from "lucide-react";
import api from "../api";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => setProperty(res.data));
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pb-30 from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Image Section */}
        {property.images?.length > 0 && (
          <div className="relative group mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={`http://localhost:5000${property.images[0]}`}
              alt={property.title}
              className="w-full h-[400px] sm:h-[500px] lg:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
            
            {/* Floating badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-blue-600 font-bold text-sm">Featured Property</span>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-2 text-slate-600 mb-6">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg">
                <DollarSign className="w-7 h-7" />
                <span className="text-3xl sm:text-4xl font-bold">
                  {property.price?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Home className="w-6 h-6 text-blue-600" />
                About This Property
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Property Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Location</p>
                    <p className="text-slate-900 font-medium">{property.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Price</p>
                    <p className="text-slate-900 font-medium">${property.price?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Interested?</h3>
              <p className="text-slate-600 mb-6">Get in touch with us to schedule a viewing or learn more about this property.</p>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}