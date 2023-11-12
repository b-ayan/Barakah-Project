import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header sticky top-0 z-20 bg-white shadow-md flex items-center justify-between px-8 py-2">
      {/* Navigation */}
      <img src={Logo} alt="Logo" className="w-40" />
      <nav className="nav text-md font-semibold">
        <ul className="flex items-center justify-center text-center">
          <li className="text-blue p-4 border-b-2 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
            <Link to="/">Home</Link>
          </li>
          <li className="text-blue p-4 border-b-2 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer active">
            <Link to="/donations">Donations</Link>
          </li>
          <li className="text-blue  p-4 border-b-2 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
            <a href="">Abou Us</a>
          </li>
          <li className="text-blue p-4 border-b-2 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
            <a href="">Contact Us</a>
          </li>
          <li className=" text-blue p-4 border-b-2 border-blue border-opacity-0 hover:border-opacity-100 hover:text-blue duration-200 cursor-pointer">
            <a href="">Donate</a>
          </li>
        </ul>
      </nav>

      {/* Buttons */}
      <div className=" flex justify-end">
        <Link to="/signup" title="">
          <button className="bg-orange  text-white py-2 px-4 shadow text-md font-semibold">
            Sign Up/In
          </button>{" "}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
