import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaChevronDown,
  FaPercent,
  FaQuestionCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartCount = 2;

  return (
    <nav className="w-full bg-white shadow px-6 py-3 fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="logo">🍽️</span>
          <span>Bite Tailor</span>
        </div>

        {/* Location + Search Bar */}
        <div className="flex flex-1 max-w-2xl items-center bg-gray-100 rounded-full px-4 py-2 space-x-3">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="text-sm text-gray-800 font-semibold">Mohali</span>
          <FaChevronDown className="text-xs text-gray-500" />
          <div className="h-5 border-r border-gray-300 mx-3" />
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right Side Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-black">
          {/* Offers */}
  <a
    href="/offers"
    className="group flex items-center gap-1 text-black hover:text-orange-500"
  >
    <FaPercent className="group-hover:text-orange-500 text-black" />
    <span className="group-hover:text-orange-500">Offers</span>
  </a>

  {/* Help */}
  <a
    href="/help"
    className="group flex items-center gap-1 text-black hover:text-orange-500"
  >
    <FaQuestionCircle className="group-hover:text-orange-500 text-black" />
    <span className="group-hover:text-orange-500">Help</span>
  </a>

  {/* Cart */}
  <a
    href="/cart"
    className="group relative flex items-center gap-1 text-black hover:text-orange-500"
  >
    <FaShoppingCart className="group-hover:text-orange-500 text-black" />
    <span className="group-hover:text-orange-500">Cart</span>
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </a>
          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-md"
            >
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="text-gray-600" />
              </div>
              <span>Avni</span>
              <FaChevronDown className="text-xs" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md z-30 overflow-hidden">
                <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                <a href="/reviews" className="block px-4 py-2 text-sm hover:bg-gray-100">Reviews</a>
                <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Log out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
