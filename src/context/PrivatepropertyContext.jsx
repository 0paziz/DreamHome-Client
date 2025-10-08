import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api"; // ✅ your configured Axios instance

// 1️⃣ Create context
const PrivatePropertyContext = createContext();

// 2️⃣ Provider component
export const PrivatePropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get token from localStorage safely
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // Fetch properties from backend
  const fetchProperties = async () => {
    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/properties/my-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Error loading properties"
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-load on mount
  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrivatePropertyContext.Provider
      value={{
        properties,
        loading,
        fetchProperties,
      }}
    >
      {children}
    </PrivatePropertyContext.Provider>
  );
};

// 3️⃣ Custom hook for easy access
export const usePrivateProperties = () => useContext(PrivatePropertyContext);
