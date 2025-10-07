import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  const fetchProperties = async (customFilters = {}) => {
    setLoading(true);
    try {
      const params = { ...filters, ...customFilters, page };
      const res = await api.get("/properties", { params });

      setProperties(res.data.properties || res.data);
      if (res.data.pages) setPages(res.data.pages);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        fetchProperties,
        filters,
        setFilters,
        page,
        setPage,
        pages,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

// ✅ Custom hook for easy access
export const usePropertyContext = () => useContext(PropertyContext);
