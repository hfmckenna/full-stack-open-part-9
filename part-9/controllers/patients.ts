import { Router } from "express";
import { Request, Response } from "express";
import Patients from "../data/patients";
import { Patient } from "../types";

const patientsRouter = Router();

patientsRouter.get("/", (_req: Request, res: Response) => {
  const patients: Omit<Patient, "ssn">[] = Patients.map(
    ({ ssn, ...patient }) => patient
  );
  res.json(patients);
});

export default patientsRouter;
