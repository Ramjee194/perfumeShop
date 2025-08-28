import Navbar from "./Navbar";


export default function About() {
  return (
    <div className="p-12 max-w-4xl mx-auto">
        <Navbar/>
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Welcome to <span className="font-semibold text-pink-600">Perfume Shop</span>, 
        your ultimate destination for discovering timeless fragrances. 
        We believe perfumes are not just scents—they are memories, 
        emotions, and stories wrapped in a bottle.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Our mission is to bring you an exclusive collection of perfumes 
        from around the world. Whether you love floral, woody, oriental, 
        or fresh fragrances, we have something special for everyone.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        At Perfume Shop, we value authenticity, quality, and elegance. 
        Each fragrance is carefully curated to suit your unique style 
        and personality.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>🏆Premium & Authentic Perfumes</li>
        <li> 🌍Wide Range of Fragrance Collections</li>
        <li> 🚛Fast & Reliable Delivery</li>
        <li> 👨🏻‍💻Customer-Centric Service</li>
      </ul>
    </div>
  );
}
