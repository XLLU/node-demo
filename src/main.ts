import express from "express";
import { Request, Response } from "express";
const app = express();
const port = 3000;

const data = [
  {
    id: 1,
    name: "lucas",
    gender: "male",
  },
  {
    id: 2,
    name: "nancy",
    gender: "female",
  },
];

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send(data);
});

app.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.send(data.filter((item) => item.id == parseInt(id, 10)));
});
