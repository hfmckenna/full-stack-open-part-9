import express from 'express';

const app = express();
import cors from 'cors';

import baseRouter from './controllers/base';
import diagnosesRouter from './controllers/diagnoses';
import patientsRouter from "./controllers/patients";

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/ping", baseRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

export default app;