import { usePropertyContext } from "../context/PropertyContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Search, MapPin, DollarSign, Home, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyList() {
  const {
    properties,
    loading,
    fetchProperties,
    filters,
    setFilters,
    page,
    setPage,
    pages,
  } = usePropertyContext();

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Discover Your Dream Property
          </h1>
          <p className="text-gray-600">Find the perfect place to call home from our curated listings</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Location Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Enter city or neighborhood"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-1" />
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Min Price
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ArrowUpDown className="w-4 h-4 inline mr-1" />
                Sort
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="">Default</option>
                <option value="price_low">Price: Low → High</option>
                <option value="price_high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Properties
            </button>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading amazing properties...</p>
          </div>
        ) : (
          <>
            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {properties.map((p) => (
                    <Link 
                      key={p._id} 
                      to={`/properties/${p._id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative h-56 overflow-hidden bg-gray-200">
                          {p.images?.[0] ? (
                            <img
                              src={`http://localhost:5000${p.images[0]}`}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <Home className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                          {/* Type Badge */}
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                            {p.type || 'Property'}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {p.title}
                          </h2>
                          
                          {p.location && (
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="line-clamp-1">{p.location}</span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold text-blue-600">
                                  ${p.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-blue-600 font-medium group-hover:gap-2 flex items-center transition-all">
                                View Details
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className={`p-2 rounded-lg border transition-all ${
                        page === 1
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {[...Array(pages).keys()].map((x) => (
                      <button
                        key={x + 1}
                        onClick={() => setPage(x + 1)}
                        className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                          page === x + 1
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {x + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(Math.min(pages, page + 1))}
                      disabled={page === pages}
                      className={`p-2 rounded-lg border transition-all ${
                        page === pages
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <Home className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search filters to find more results</p>
                <button
                  onClick={() => {
                    setFilters({ location: '', type: '', minPrice: '', maxPrice: '', sortBy: '' });
                    setPage(1);
                    fetchProperties();
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}