const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`listening at http://localhost:${4000}`);
});
