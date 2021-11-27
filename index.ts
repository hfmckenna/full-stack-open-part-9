import express from "express";
import { calculateBmi } from "./utils/calculators";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(422).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    height,
    weight,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});