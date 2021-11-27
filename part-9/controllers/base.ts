const express = require('express');
const baseRouter = express.Router();

baseRouter.get('/', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

export default baseRouter;