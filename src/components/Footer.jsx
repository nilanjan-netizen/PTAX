import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 animate-gradient-x -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-white relative z-10">
        
        {/* About Section */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 tracking-wide">Tripura's Tax Portal</h2>
          <p className="text-gray-300 leading-relaxed">
            Your trusted portal for all tax-related services. Access forms, file returns, and manage your taxes with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "Individual/HUF", to: "/individual" },
              { name: "Company", to: "/company" },
              { name: "Non-Company", to: "/non-company" },
              { name: "Tax Professionals & Others", to: "/tax-professionals" },
              { name: "Downloads", to: "/downloads" },
              { name: "Help", to: "/help" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="px-4 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition-all duration-300 transform hover:scale-105 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-5 mb-4 text-xl">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-white/30 transition duration-500 transform hover:scale-110 motion-safe:animate-bounce"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            &copy; {new Date().getFullYear()} Tripura's Tax Portal. All rights reserved.
          </p>
        </div>
      </div>

      {/* Gradient Animation Tailwind Keyframes */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
