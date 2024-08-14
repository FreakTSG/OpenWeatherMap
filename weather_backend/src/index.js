const express = require('express');
const cors = require('cors');
const app = express();
const weatherRoutes = require('./routes/weatherRoutes');
require('dotenv').config();

app.use(cors());
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
console.log("API_KEY:", process.env.API_KEY); // Verifica se a chave está sendo carregada corretamente

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });