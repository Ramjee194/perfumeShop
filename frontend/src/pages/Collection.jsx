import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


export default function Collection() {
  const [products, setProducts] = useState([]);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

 useEffect(() => {
  axios.get(`${backendUrl}/api/products`)
    .then(res => setProducts(res.data))
    .catch(err => console.error("Error fetching products", err));
}, [backendUrl]);

  return (
   
    <div className="p-10">
         <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-center">Our Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="bg-white shadow-lg rounded-xl hover:scale-105 transition p-4"
          >
            <img
              src={p.images[0]}
              alt={p.name}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-500">{p.description.slice(0, 40)}...</p>
            <p className="text-pink-600 font-bold mt-2">₹{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
