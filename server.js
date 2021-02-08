const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express()
const socket = require('socket.io');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://BartoszHoroba:newwaveapp123@cluster0.ltq2j.mongodb.net/newWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
  cors: {
    origin: '*',
    }
  });

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

io.on('connection', (socket)=> {
  console.log('New socket!', socket.id);
});

app.use(express.static(path.join(__dirname, '/client/NewWaveFest/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/NewWaveFest/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

module.exports = server;
