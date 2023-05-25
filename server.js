const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/data', (req, res) => {
  let distanceInfo = null;

  if(!distanceInfo) {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=AIzaSyAWH9MKNEKtg2LMmFtGyj9xxkrPH5pdOxQ')
    .then(response => {
      distanceInfo = response.data;
      if(distanceInfo) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(distanceInfo));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({error: 'Data not found'}));
      }
   })
    .catch(error => {
    console.error(error);
  });

    
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
