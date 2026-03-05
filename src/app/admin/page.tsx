"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Glasses",
    price: "",
    description: "",
    image_url: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "info", message: "Securing entry..." });

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      setStatus({ type: "error", message: "Price must be a valid number." });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name: formData.name,
        category: formData.category,
        price: priceNum,
        description: formData.description,
        image_url: formData.image_url,
      },
    ]);

    if (error) {
      setStatus({
        type: "error",
        message: "Failed to add product: " + error.message,
      });
    } else {
      setStatus({
        type: "success",
        message: "Product added to vault successfully!",
      });
      setFormData({
        name: "",
        category: "Glasses",
        price: "",
        description: "",
        image_url: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold tracking-widest mb-2 border-b border-gray-800 pb-4">
          YURA // COMMAND CENTER
        </h1>
        <p className="text-gray-400 mb-8 uppercase tracking-widest text-sm">
          Vault Data Entry Protocol
        </p>

        {status.message && (
          <div
            className={`p-4 mb-6 rounded border ${
              status.type === "error"
                ? "bg-red-900/20 border-red-500 text-red-200"
                : status.type === "success"
                ? "bg-green-900/20 border-green-500 text-green-200"
                : "bg-blue-900/20 border-blue-500 text-blue-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-gray-800 p-8 rounded-lg space-y-6 shadow-2xl"
        >
          <div>
            <label className="block text-gray-400 text-sm tracking-widest uppercase mb-2">
              Product Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-white transition"
              placeholder="e.g. YURA Onyx Shades"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm tracking-widest uppercase mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-white transition"
              >
                <option value="Glasses">Glasses</option>
                <option value="Durags">Durags</option>
                <option value="Watches">Watches</option>
                <option value="Rings">Rings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Leather">Leather</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm tracking-widest uppercase mb-2">
                Price (MAD)
              </label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-white transition"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm tracking-widest uppercase mb-2">
              Image URL
            </label>
            <input
              required
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-white transition"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm tracking-widest uppercase mb-2">
              Description
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-white transition"
              placeholder="Product details..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-gray-300 transition disabled:opacity-50"
          >
            {isLoading ? "Securing..." : "Add to Vault"}
          </button>
        </form>
      </div>
    </main>
  );
}


