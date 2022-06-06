const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

mongoose.connect('mongodb+srv://rw_user:NIwjZhEFfbGBIDF6@cluster0.n6grp.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

const saucesRoutes = require("./Routes/sauces")
const userRoutes = require("./Routes/User")

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

module.exports = app;