import express, { Request, Response } from 'express';

const app = express();

interface Product {
  id: number;
  name: string;
  price: number;
}

const dummyProducts: Product[] = [
  { id: 1, name: "TypeScript Laptop", price: 1500 },
  { id: 2, name: "Next.js Phone", price: 900 }
];

app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    status: "Success",
    message: "Backend connected with TypeScript!",
    data: dummyProducts
  });
});

export default app;