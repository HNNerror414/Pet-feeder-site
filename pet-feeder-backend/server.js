const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://Hananmuzin:Hanan%40clt2004@cluster0.k1wym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your connection string
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the app if connection fails
  });

// Schema and Model
const TimetableSchema = new mongoose.Schema({
  date: String,
  intervals: Number,
  repeat: String,
  feedingTimes: [String],
});

const Timetable = mongoose.model('Timetable', TimetableSchema);

// Routes
app.post('/api/timetable', async (req, res) => {
  try {
    const { date, intervals, repeat, feedingTimes } = req.body;

    if (!date || !intervals || !repeat || !feedingTimes) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const timetable = new Timetable({ date, intervals, repeat, feedingTimes });
    await timetable.save();

    res.json({ success: true, message: 'Timetable saved successfully!', timetable });
  } catch (error) {
    console.error('Error saving timetable:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/timetable', async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json({ success: true, timetables });
  } catch (error) {
    console.error('Error fetching timetables:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
