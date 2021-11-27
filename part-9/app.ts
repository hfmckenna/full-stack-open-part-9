const express = require('express');

const app = express();
import baseRouter from './controllers/base';

app.use(express.static("build"));
app.use(express.json());
app.use("/api/ping", baseRouter);

export default app;