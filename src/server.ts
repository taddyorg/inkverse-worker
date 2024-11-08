import express from 'express';
import cors from 'cors';

import { getSafeError, setUpLogger } from './shared/utils/errors.js';

const PORT = 3011;
const app = express();

const corsOptions = { 
  origin: '*',
  methods: "GET,HEAD,POST,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 3600,
};

setUpLogger();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions))

app.get('/worker', (req, res) => {
  res.send('😁')
});

app.get('/worker/healthcheck', (req, res) => {
  res.send('😁')
});

app.post('/worker/process-taddy-webhook', async function (req, res, next) {
  let safeErrorMessage = "Could not process Taddy webhook";
  try {
    console.log("Processing Taddy webhook", req.body)
    res.status(200).send('OK')
  } catch(error) {
    next(getSafeError(error, safeErrorMessage));
  }
});

app.listen(PORT, () => {
  console.log(`Worker listening at http://localhost:${PORT}/worker`)
})
