const express = require('express');
const cors = require('cors')
const db = require('./db');
const path = require('path');
const app = express()
const socket = require('socket.io');

const server = app.listen(8000, () => {
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
