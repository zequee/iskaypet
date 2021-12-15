const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const URI = `mongodb+srv://iskaypet:Iskaypet01@cluster0.amk1d.mongodb.net/iskaypet?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB Connected'))
  .catch(err => console.error(err));

module.exports - mongoose;
