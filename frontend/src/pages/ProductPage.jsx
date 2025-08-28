import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [history, setHistory] = useState([]); // image click history

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setHistory([res.data.images[0]]); // initialize with first image
      })
      .catch(err => console.error(err));
  }, [id]);

  const addReview = () => {
    if (!review.trim()) return alert("Please write something.");
    axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
      user: "Guest",
      comment: review,
      rating: 5
    }).then(res => {
      setProduct(res.data);
      setReview("");
    }).catch(err => console.error(err));
  };

  if (!product) return <p className="p-8">Loading...</p>;

  const total = product.images.length;

  const prev = () => setCurrentImage((idx) => (idx - 1 + total) % total);
  const next = () => setCurrentImage((idx) => (idx + 1) % total);

  const handleThumbnailClick = (i) => {
    setCurrentImage(i);
    setHistory((prev) => {
      const newHistory = [...prev];
      const clickedImage = product.images[i];
      if (!newHistory.includes(clickedImage)) newHistory.push(clickedImage);
      return newHistory;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[384px]">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} ${i}`}
              onClick={() => handleThumbnailClick(i)}
              className={`h-20 w-20 object-cover rounded cursor-pointer flex-shrink-0 border-2 ${
                currentImage === i ? "border-pink-500" : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main image + arrows */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full max-w-2xl">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="h-96 w-full object-cover rounded-xl shadow-lg"
            />

            {/* Prev/Next buttons */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-2 rounded-full shadow"
            >
              ⮜
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-2 rounded-full shadow"
            >
              ⮞
            </button>
          </div>

          {/* indicator */}
          <div className="mt-3 text-sm text-gray-600">
            {currentImage + 1} / {total}
          </div>

          {/* Image click history */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {history.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`history-${i}`}
                className="h-12 w-12 object-cover rounded border border-gray-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <h2 className="text-3xl font-bold mt-6">{product.name}</h2>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="text-xl font-bold text-pink-600 mt-2">₹{product.price}</p>
      {product.sizes && <p className="mt-2">Available Sizes: {product.sizes.join(", ")}</p>}

      {/* Reviews */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="mt-2 space-y-2">
          {product.reviews.map((r, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded-lg">
              <b>{r.user || "Guest"}</b>: {r.comment}
            </div>
          ))}
        </div>

        <textarea
          className="border p-2 mt-4 w-full rounded"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review..."
        />
        <button
          onClick={addReview}
          className="mt-2 bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600"
        >
          Submit Review
        </button>
      </div>

      {/* Share */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onClick={() =>
          navigator.share
            ? navigator.share({ title: product.name, url: window.location.href })
            : alert("Sharing not supported in this browser")
        }
      >
        Share Product
      </button>
    </div>
  );
}
