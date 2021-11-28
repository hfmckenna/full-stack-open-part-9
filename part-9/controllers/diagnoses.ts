import { Router } from "express";
import { Request, Response } from "express";
import Diagnoses from "../data/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req: Request, res: Response) => {
  const diagnoses = Diagnoses;
  res.json(diagnoses);
});

export default diagnosesRouter;
