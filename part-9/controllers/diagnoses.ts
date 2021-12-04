import { Router } from "express";
import { Request, Response } from "express";
import Diagnoses from "../data/diagnoses";

const diagnosesRouter = Router();
const diagnoses = Diagnoses;

diagnosesRouter.get("/", (_req: Request, res: Response) => {
  const diagnoses = Diagnoses;
  res.json(diagnoses);
});

diagnosesRouter.get("/:code", (req: Request, res: Response) => {
  const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === req.params.code);
  res.json(diagnosis);
});

export default diagnosesRouter;
