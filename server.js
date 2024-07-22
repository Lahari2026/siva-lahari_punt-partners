const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // Parses JSON bodies
app.use(cors());

app.use('/api/translate', require('./routes/translate'));
app.use('/api/speech', require('./routes/speech'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
