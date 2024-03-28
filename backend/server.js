const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.connect('mongodb+srv://abhinavKiller4we:Neymar@16062003@cluster0.wug7nof.mongodb.net/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const signupSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobileNumber: String,
  email: String,
  photo: String
});
const Signup = mongoose.model('Signup', signupSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/signup', upload.single('photo'), async (req, res) => {
  try {
    const { name, age, mobileNumber, email } = req.body;
    const photo = req.file.filename;

    const newUser = new Signup({
      name,
      age,
      mobileNumber,
      email,
      photo
    });

    await newUser.save();
    res.json({ message: 'User details and photo stored successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while storing user details' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
