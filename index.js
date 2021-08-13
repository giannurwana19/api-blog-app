const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const authRoute = require('./src/routes/auth');

app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${4000}`);
});
