import express from 'express';

const app = express();
import baseRouter from './controllers/base';
import diagnosesRouter from './controllers/diagnoses';

app.use(express.static("build"));
app.use(express.json());
app.use("/api/ping", baseRouter);
app.use("/api/diagnoses", diagnosesRouter);

export default app;