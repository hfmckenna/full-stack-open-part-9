import { Router } from "express";
import { Request, Response } from "express";
import Patients from "../data/patients";
import { Patient } from "../types";
import { v1 as uuid } from "uuid";

const patientsRouter = Router();
let patients = Patients;

patientsRouter.get("/", (_req: Request, res: Response) => {
  const patientsPrivate: Omit<Patient, "ssn">[] = patients.map(
    ({ ssn, ...patient }) => patient
  );
  res.json(patientsPrivate);
});

patientsRouter.post("/", (req: Request, res: Response) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const patient: Patient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(patient);

  res.json(patient);
});

export default patientsRouter;
