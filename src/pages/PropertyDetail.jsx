import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, DollarSign, Home, Calendar, Maximize, Bed, Bath, Square, Car, Ruler, Building2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br pb-16 sm:pb-20 md:pb-30 from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Hero Image Section */}
        {property.images?.length > 0 && (
          <div className="relative group mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={`${property.images[0]}`}
              alt={property.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
            
            {/* Floating badge */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <span className="text-blue-600 font-bold text-xs sm:text-sm">Featured Property</span>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-slate-200">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-2 text-slate-600 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <span className="text-base sm:text-lg">{property.location}</span>
              </div>

              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg">
                <DollarSign className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {property.price?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Property Features Grid */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Property Features
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {property.bedrooms && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Bed className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{property.bedrooms}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Bedrooms</p>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Bath className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{property.bathrooms}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Bathrooms</p>
                  </div>
                )}

                {property.area && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Maximize className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{property.area}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Sq Ft</p>
                  </div>
                )}

                {property.parking && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Car className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{property.parking}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Parking</p>
                  </div>
                )}

                {property.type && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Home className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-lg sm:text-xl font-bold text-slate-900">{property.type}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Property Type</p>
                  </div>
                )}

                {property.yearBuilt && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100 text-center hover:shadow-md transition-shadow">
                    <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{property.yearBuilt}</p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">Year Built</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                About This Property
              </h2>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-blue-100">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Property Details</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Location</p>
                    <p className="text-slate-900 font-medium break-words">{property.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Price</p>
                    <p className="text-slate-900 font-medium">${property.price?.toLocaleString()}</p>
                  </div>
                </div>

                {property.bedrooms && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                    <Bed className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Bedrooms</p>
                      <p className="text-slate-900 font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                )}

                {property.bathrooms && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                    <Bath className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Bathrooms</p>
                      <p className="text-slate-900 font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Interested?</h3>
              <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">Get in touch with us to schedule a viewing or learn more about this property.</p>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}