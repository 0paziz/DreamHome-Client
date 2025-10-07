import { usePropertyContext } from "../context/PropertyContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Bed, 
  Bath, 
  Home, 
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Search,
  Building2,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const { properties } = usePropertyContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 6s
  useEffect(() => {
    if (!isHovered && properties.length > 0) {
      const interval = setInterval(() => nextSlide(), 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, properties, isHovered]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % properties.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);

  const currentProperty = properties[currentIndex];

  const stats = [
    { icon: Building2, label: "Properties", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "2,000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: TrendingUp, label: "Success Rate", value: "98%" }
  ];

  return (
    <div className="min-h-screen bg-white w-7xl mx-auto">
      {/* Hero Section */}
      <section 
        className="relative h-screen overflow-hidden mt-5 rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {properties.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProperty._id + currentIndex}
                className="absolute inset-0 "
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1 }}
              >
                <div className="rounded-2xl  absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
                <img
                  src={`https://dreamhomes-backend-3mbn.onrender.com${currentProperty.images?.[0]}`}
                  alt={currentProperty.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hero Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    key={currentProperty._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-xl text-blue-100 px-5 py-2 rounded-full text-sm font-semibold border border-blue-400/30 mb-6">
                      <Sparkles className="w-4 h-4" /> Featured Property
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                      Find Your 
                      <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Dream Home
                      </span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                      Discover the perfect property from our exclusive collection of premium real estate listings
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/properties" className="group flex items-center gap-3 bg-white hover:bg-blue-600 text-gray-900 hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-2xl">
                        <Search className="w-5 h-5" /> Browse Properties <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link to={`/properties/${currentProperty._id}`} className="flex items-center gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 border border-white/30">
                        View This Property
                      </Link>
                    </div>
                  </motion.div>

                  {/* Property Card */}
                  <motion.div
                    key={currentProperty._id + "card"}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:block"
                  >
                    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                      <span className="inline-block bg-blue-500/30 text-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        {currentProperty.type || 'Property'}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-3">{currentProperty.title}</h3>
                      {currentProperty.location && (
                        <div className="flex items-center text-gray-200 mb-6">
                          <MapPin className="w-5 h-5 mr-2" /> {currentProperty.location}
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {currentProperty.bedrooms && (
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                            <Bed className="w-6 h-6 text-blue-300 mb-2" />
                            <p className="text-2xl font-bold text-white">{currentProperty.bedrooms}</p>
                            <p className="text-sm text-gray-300">Bedrooms</p>
                          </div>
                        )}
                        {currentProperty.bathrooms && (
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                            <Bath className="w-6 h-6 text-blue-300 mb-2" />
                            <p className="text-2xl font-bold text-white">{currentProperty.bathrooms}</p>
                            <p className="text-sm text-gray-300">Bathrooms</p>
                          </div>
                        )}
                      </div>
                      <div className="pt-6 border-t border-white/20">
                        <p className="text-sm text-gray-300 mb-2">Price</p>
                        <p className="text-4xl font-bold text-white">${currentProperty.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-30 px-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex gap-2">
                {properties.map((_, i) => (
                  <button key={i} onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full ${i===currentIndex ? "w-12 h-2 bg-white shadow-lg" : "w-8 h-2 bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={prevSlide} className="flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 transition-all group">
                  <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={nextSlide} className="flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/20 transition-all group">
                  <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center px-6">
              <Home className="w-24 h-24 text-blue-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to DreamHomes</h2>
              <p className="text-xl text-gray-600 mb-8">Loading our exclusive property collection...</p>
            </div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat,i) => (
            <motion.div key={stat.label} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.6}} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      {properties.length>0 && (
        <section className="py-24 bg-white ">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked properties that match your luxury lifestyle</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0,6).map((property,i)=>(
                <motion.div key={property._id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.6}}>
                  <Link to={`/properties/${property._id}`} className="group block">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="relative h-64 overflow-hidden">
                        <img src={`http://localhost:5000${property.images?.[0]}`} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-800">
                          {property.type}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
                        {property.location && <div className="flex items-center text-gray-600 mb-4"><MapPin className="w-4 h-4 mr-1" /><span className="text-sm line-clamp-1">{property.location}</span></div>}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <p className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/properties" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl">
                View All Properties <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
