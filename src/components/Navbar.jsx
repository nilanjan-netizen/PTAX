import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <header className="relative w-full overflow-hidden shadow-lg">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-700 to-indigo-800 animate-gradient-x -z-10"></div>

      <div className="flex items-center justify-between px-6 py-4 relative z-10">
        
        {/* Logo */}
        <div className="text-3xl font-extrabold whitespace-nowrap text-white drop-shadow-lg hover:text-yellow-300 transition-all duration-300 transform hover:scale-105">
          <Link to="/">Tripura's Tax Portal</Link>
        </div>

        {/* Center Links */}
      <div className="flex gap-6 mx-6 whitespace-nowrap">
  {[
    { name: "Individual/HUF", to: "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable" },
  { name: "Company", to: "https://www.incometax.gov.in/iec/foportal/help/company/return-applicable" },
  { name: "Non-Company", to: "https://www.incometax.gov.in/iec/foportal/help/non-company/return-applicable" },
  { name: "Tax Professionals & Others", to: "https://www.incometax.gov.in/iec/foportal/help/all-topics/tax-payer/tax-professionals-and-others" },
    // { name: "Downloads", to: "/downloads" },
    { name: "Help", to: "/help" },
  ].map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`relative text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
        ${
          link.name === "Help"
            ? "bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 hover:text-white transform hover:scale-105"
            : "text-white drop-shadow hover:bg-white/20 hover:text-yellow-300 shadow hover:shadow-xl transform hover:scale-105"
        }`}
    >
      {link.name}
    </Link>
  ))}
</div>


        {/* Auth Buttons */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-blue-700 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow hover:shadow-xl transform hover:scale-105">
                Login
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow hover:shadow-xl transform hover:scale-105">
                Register
              </button>
            </SignUpButton>
          </SignedOut>
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
    </header>
  );
};

export default Navbar;
