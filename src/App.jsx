import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

function AppWrapper() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
   
    <>
    
      <Navbar />
      {/* Ensure the page scrolls to top on route change */}
      <ScrollToTop />
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
