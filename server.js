const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

// ----------------- MIDDLEWARE ------------------------------ //

// NOTE BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


// --------------------- ROUTES ------------------------------ //

// NOTE GET Root Route
app.get('/', (req, res) => res.send('<h1>Welcome to Appointment App</h1>'));




// ----------------- START SERVER ---------------------------- //

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
