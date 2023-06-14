const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes
app.get('/api/data', (req, res) => {
  let distanceInfo = null;
  const origin = req.query.origin;
  const destination = req.query.destination;

  if(!distanceInfo) {
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=AIzaSyAWH9MKNEKtg2LMmFtGyj9xxkrPH5pdOxQ`)
    .then(response => {
      distanceInfo = response.data;
      if(distanceInfo) {
        return res.json(distanceInfo);

      } else {
        return res.status(404).json({ error: 'Data not found' });
      }
   })
    .catch(error => {
    console.error(error);
  });

    
  }
});


