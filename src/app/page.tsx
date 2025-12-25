"use client";
import { useEffect, useState } from 'react';

export default function AdminProducts() {
 const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // প্রোডাক্ট লোড করা
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Loading error:", err));
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      // ডিলিট রিকোয়েস্ট পাঠানো
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // যদি সফল হয় তবে লিস্ট আপডেট করা
        setProducts(products.filter((p: any) => p._id !== id));
        alert("Product deleted successfully!");
      } else {
        // যদি ৪-০-৫ বা অন্য এরর আসে
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to delete'}`);
        console.error("Server Response:", errorData);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error("Delete call failed:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading Products...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Manage Products</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-orange-400">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">
                <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}