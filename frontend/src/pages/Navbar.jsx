import { Link } from "react-router-dom";

import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");


  return (
    <nav className="p-4 bg-black text-white flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Perfume Shop
      </Link>

      {/* Links */}
      <ul className="flex gap-6 mt-3 md:mt-0">
        <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
        <li><Link to="/collection" className="hover:text-pink-400">Collection</Link></li>
        <li><Link to="/about" className="hover:text-pink-400">About</Link></li>
      </ul>

    </nav>
  );
}
