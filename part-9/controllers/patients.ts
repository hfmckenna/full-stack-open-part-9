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

patientsRouter.post("/:id/entries", (req: Request, res: Response) => {
  const patientIndex = patients.findIndex((patientIndexed) => patientIndexed.id === req.params.id);
  const patient = patients.find((patient) => patient.id === req.params.id);
  if (patient !== undefined) {
    const { description, date, specialist, type } = req.body;

    const diagnosisCodes = req.body?.diagnosisCodes ?? null;

    let newEntry = Object.assign(
      { id: uuid(), description, date, specialist, type },
      diagnosisCodes && { diagnosisCodes }
    );

    let addEntry;

    switch (type) {
      case "Hospital":
        const { discharge } = req.body;
        addEntry = Object.assign(newEntry, discharge && { discharge });
        break;
      case "OccupationalHealthcare":
        const { employerName } = req.body;
        const sickLeave = req.body?.sickLeave ?? null;
        addEntry = Object.assign(
          newEntry,
          employerName && { employerName },
          sickLeave && { sickLeave }
        );
        break;
      case "HealthCheck":
        const { healthCheckRating } = req.body;
        addEntry = Object.assign(
          newEntry,
          healthCheckRating && { healthCheckRating }
        );
        break;
    }

    patient.entries.push(addEntry);
    patients.splice(patientIndex, 1, patient);
    res.json(patient);
  } else {
    res.status(304);
  }
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
    entries: [],
  };

  patients.push(patient);

  res.json(patient);
});

export default patientsRouter;
