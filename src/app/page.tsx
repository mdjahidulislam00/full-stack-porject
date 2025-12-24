"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch('/api/server')
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg("Backend still not found!"));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{msg}</h1>
    </div>
  );
}