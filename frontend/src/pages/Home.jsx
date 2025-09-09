import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Backend se products fetch karo
    axios
      .get(`${backendUrl}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Search filter
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-16 text-center text-white">
        <h2 className="text-4xl font-bold">Your Signature, Your Scent</h2>
        <p className="mt-2">Exclusive collection just for you</p>
      </div>

      {/* Search bar */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center bg-white rounded-full shadow-md px-6 py-2 w-full md:w-96">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search perfumes..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1 outline-none text-black"
          />
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Link key={p._id} to={`/product/${p._id}`}>
              <div className="bg-white shadow-lg rounded-xl hover:scale-105 transition p-4">
                <img
                  src={p.images?.length > 0 ? p.images[0] : ""}
                  alt={p.name || "Perfume"}
                  className="h-48 w-full object-cover rounded bg-gray-200"
                  onError={(e) => (e.target.src = "/placeholder.jpg")} // fallback
                />
                <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                <p className="text-gray-500">
                  {p.description ? p.description.slice(0, 40) + "..." : ""}
                </p>
                <p className="text-pink-600 font-bold mt-2">₹{p.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
