import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/sec3.png';
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const displayName = user ? user.firstName || user.fullName : "Welcome";
  const email = user ? user.emailAddresses[0].emailAddress : "guest@example.com";

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-6 py-10 transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <motion.div
        className="max-w-2xl w-full p-8 rounded-3xl text-center backdrop-blur-sm shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        initial={{ opacity: 0, y: 300, scale: 0.9 }}  // start below screen
        animate={{ opacity: 1, y: 0, scale: 1 }}      // animate to center
        transition={{ duration: 1.75, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          Hello, {displayName} ({email}) welcome to the Tax Portal
        </h1>
        <p className="text-white text-base sm:text-lg mb-8 font-medium drop-shadow-sm">
          Start your enrollment process by clicking the button below.
        </p>
        <button
          onClick={() => navigate('/step1')}
          className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-100 hover:text-indigo-700 transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          Go to Step 1 ➡
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
