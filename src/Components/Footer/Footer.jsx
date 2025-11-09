import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-50 to-white text-gray-700 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">

          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-3xl font-bold text-rose-500 hover:text-rose-600 transition">
              WarmPaws
            </Link>
            <p className="text-gray-500 max-w-xs">
              Keeping your furry friends cozy, safe, and healthy during winter. Explore tips, services, and more for your beloved pets.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-700 text-lg">Quick Links</h3>
            <Link to="/" className="hover:text-rose-500 transition">Home</Link>
            <Link to="/services" className="hover:text-rose-500 transition">Services</Link>
            <Link to="/profile" className="hover:text-rose-500 transition">My Profile</Link>
            <Link to="/privacy" className="hover:text-rose-500 transition">Privacy Policy</Link>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-700 text-lg">Contact</h3>
            <p>Email: <a href="mailto:info@warmpaws.com" className="hover:text-rose-500 transition">info@warmpaws.com</a></p>
            <p>Phone: <a href="tel:+880123456789" className="hover:text-rose-500 transition">+880 123 456 789</a></p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-700 text-lg">Follow Us</h3>
            <div className="flex space-x-4 mt-1">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full shadow hover:bg-rose-500 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full shadow hover:bg-rose-500 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full shadow hover:bg-rose-500 hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} WarmPaws. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
