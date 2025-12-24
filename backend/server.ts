import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// মনে রাখবেন: এখানে রাউট হবে শুধু /api/test
app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    status: "Success",
    message: "Perfectly working from Express!",
    data: [{ id: 1, name: "Smart Watch", price: 200 }]
  });
});

export default app;