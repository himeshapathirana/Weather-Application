require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');
const path = require('path');
const User = require('./models/User');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const fetchWeatherAndSendEmail = async () => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Iterate through each user
    for (const user of users) {
      try {
        // Fetch weather data from OpenWeatherMap API
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);

        // Extract weather description and temperature
        const weatherDescription = data.weather && data.weather.length > 0 ? data.weather[0].description : 'Unknown';
        const temperature = data.main ? data.main.temp : 'Unknown';

        // Construct weather report message
        const weatherData = `Weather in ${user.location}: ${weatherDescription}, Temperature: ${temperature}°C`;
        const weatherReport = { date: new Date(), weatherData };

        // Save weather report to user's profile
        user.weatherReports.push(weatherReport);
        await user.save();

        // Prepare email options
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: user.email,
          subject: 'Hourly Weather Report',
          text: weatherData,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email}: ${info.response}`);

      } catch (error) {
        console.error(`Error processing weather for ${user.location}:`, error.message);
      }
    }

  } catch (error) {
    console.error('Error fetching weather and sending email:', error.message);
  }
};

// Cron job to run every 3 hours
cron.schedule('0 */3 * * *', fetchWeatherAndSendEmail);

// Routes
app.use('/users', userRouter); // Mount userRouter at /users

// Route to fetch real-time weather data
app.get('/weather', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
