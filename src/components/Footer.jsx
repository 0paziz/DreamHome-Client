import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About Us", path: "/" },
    { name: "Contact", path: "/" },
  ];

  const socialIcons = [
    { icon: <FaFacebookF />, href: "#", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, href: "#", color: "hover:bg-blue-400" },
    { icon: <FaInstagram />, href: "#", color: "hover:bg-pink-500" },
    { icon: <FaLinkedinIn />, href: "#", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Company Info & Newsletter */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">DreamHomes</h2>
          <p className="text-gray-400">
            Discover your perfect home with DreamHomes — modern listings, trusted agents, and seamless experience.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 p-2 rounded border border-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-white transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400">123 Real Estate Blvd</p>
          <p className="text-gray-400">New York, NY 10001</p>
          <p className="text-gray-400 mt-2">info@dreamhomes.com</p>
          <p className="text-gray-400">+1 (555) 123-4567</p>
          <div className="flex space-x-3 mt-4">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className={`bg-gray-700 p-3 rounded-full transition ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Optional Featured Property Previews */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Featured Homes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded transition">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Luxury Villa"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-medium text-sm truncate">Luxury Villa</p>
                <p className="text-gray-400 text-sm">$950,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded transition">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                alt="City Apartment"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-medium text-sm truncate">City Apartment</p>
                <p className="text-gray-400 text-sm">$320,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded transition">
              <img
                src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
                alt="Country House"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-medium text-sm truncate">Country House</p>
                <p className="text-gray-400 text-sm">$540,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {currentYear} DreamHomes. All rights reserved.
      </div>
    </footer>
  );
}
