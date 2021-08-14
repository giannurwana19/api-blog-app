const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 4000;

dotenv.config();
app.use(express.json());

if (!fs.existsSync('./images')) {
  fs.mkdirSync('./images');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, 'hello.jpg');
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File has been uploaded!' });
});

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

app.post('api/upload', (req, res) => {
  res.status(200).json({ message: 'File has been uploaded!' });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${4000}`);
});
