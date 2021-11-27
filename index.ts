import express from "express";
import { calculateBmi, exerciseCalculator } from "./utils/calculators";
export interface CalculateValues {
  daily_exercises: Array<number>;
  target: number;
}

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  const body: CalculateValues = req.body;
  try {
    if (!body?.target || !body?.daily_exercises) throw new Error("parameters missing");

    const hours = body.daily_exercises.map((hour: number) => {
      const number = Number(hour);
      if (isNaN(number)) {
        throw new Error("malformatted parameters, issue with submitted exercises");
      } else {
        return number;
      }
    });

    if (isNaN(Number(body.target))) {
      throw new Error("malformatted parameters, issue with submitted target");
    }

    const target = Number(body.target);
    const exerciseCalculation = exerciseCalculator(hours, target);
    res.status(200).json({body: exerciseCalculation});
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
