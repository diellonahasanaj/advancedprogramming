const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importo rrugët
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rrugë bazë
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Rrugët e API-t
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Trajtimi i gabimeve
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Startoni serverin
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveri është startuar në portin ${PORT}`);
});