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

// NOTE Custom Logger Middleware
app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleString();
    console.table({ url, method, requestedAt })
    next();
});

// NOTE User Session
app.use(session({
    secret: "Super Secret",
    resave: false,
    // NOTE Only save the session if a property has been added to req.session
    saveUninitialized: false
}));

const corsOptions = {
    origin: ["http://localhost:3000"],
    // NOTE This allows the session cookie to be sent back and forth
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));





// --------------------- ROUTES ------------------------------ //

// NOTE GET Root Route
app.get('/', (req, res) => res.send('<h1>Welcome to Appointment API</h1>'));

// NOTE Auth Route
app.use('/api/v1/auth', routes.auth);

//  NOTE Users Route
app.use('/api/v1/users', routes.users);

// NOTE Appointment Route
app.use('/api/v1/appointments', routes.appointments);




// ----------------- START SERVER ---------------------------- //

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
