"use client";
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse {
  message: string;
  data: Product[];
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/test');
        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '50px' }}>
      <h1>Next.js + Express (TypeScript)</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div style={{ background: '#222', color: '#fff', padding: '20px' }}>
          <h3>{data.message}</h3>
          <ul>
            {data.data.map(product => (
              <li key={product.id}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}