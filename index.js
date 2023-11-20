// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Plan
// First, I have to get the endpoint.
// If string, I have to parse. If unix, use number provided.
// Format requested is in UTC string, so use Date.toUTCString()
// Unix: Date.valueOf().

app.get('/api', (req, res) => {

  dateObject = new Date()

  res.json({
    "unix": dateObject.valueOf(),
    "utc": dateObject.toUTCString()
  })

})

app.get('/api/:date', (req, res) => {
  let dateIn = req.params.date

  if (!isNaN(Number(dateIn))) { // Confusing double negative. Checks if dateIn is a Number.
    dateIn = Number(dateIn)
  }
  dateObject = new Date(dateIn)

  if (dateObject.toString() === "Invalid Date") {
    res.json({
      "error": "Invalid Date"
    })
  } else {
    res.json({
      "unix": dateObject.valueOf(),
      "utc": dateObject.toUTCString()
    })
  }
}) 