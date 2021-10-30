// Setup empty JS object to act as endpoint for all routes
const projectData = {};

/* Empty JS object to act as endpoint for all routes */
const express = require('express')
const axios = require('axios');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 8081;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
    // console.log/(server/);
    console.log(`running on localhost: ${port}`);
}

app.get('/all', (req, res) => {
    res.send(projectData)
    console.log(projectData)
})

app.post('/postData', (req, res) => {
    projectData.temp = req.body.temp
    projectData.date = req.body.date
    projectData.content = req.body.content
    projectData.city = req.body.city
    projectData.country = req.body.country
    res.send(projectData).status(200).end()
})