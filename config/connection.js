const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nb1mqhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));