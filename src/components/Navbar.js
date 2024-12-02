import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">POAP</Link>
        <div>
          <Link to="/login" className="text-gray-300 mx-2">Login</Link>
          <Link to="/register" className="text-gray-300 mx-2">Register Event</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
