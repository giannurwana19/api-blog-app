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

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${4000}`);
});
