import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import shop from './routes/shop';

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/shop', shop);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});