const express = require('express');
const session = require('express-session');
const app = express();
const fs = require('fs');
const path = require('path');


app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'public'));

// Set up the login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Alexco2003' && password === 'Alexco2003') {
    req.session.user = username;
    res.redirect('/success');
  } else {
    res.send('Login failed!');
  }
});

// Set up the success route
app.get('/success', (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + '/public/success.html');
  } else {
    res.redirect('/login');
  }
});

// Route for Ajax request
app.get('/data', (req, res) => {
  fs.readFile(__dirname + '/public/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Route for profile template
app.get('/profile', (req, res) => {
  const username = req.session.user;
  res.render('profile', { username }); // Pass the 'username' variable to the template
});


// 404 error route
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000 (localhost:5000/proiect.html)');
});
