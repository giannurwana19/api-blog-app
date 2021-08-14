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

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute');

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${4000}`);
});
