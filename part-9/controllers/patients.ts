import { Router } from "express";
import { Request, Response } from "express";
import Patients from "../data/patients";
import { PublicPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const patientsRouter = Router();
let patients = Patients;

patientsRouter.get("/", (_req: Request, res: Response) => {
  const patientsPrivate: PublicPatient[] = patients.map(
    ({ entries, ssn, ...patient }) => patient
  );
  res.json(patientsPrivate);
});

patientsRouter.get("/:id", (req: Request, res: Response) => {
  const patient = patients.find((patient) => patient.id === req.params.id);
  res.json(patient);
});

patientsRouter.post("/", (req: Request, res: Response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const patient: Patient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: []
  };

  patients.push(patient);

  res.json(patient);
});

export default patientsRouter;
