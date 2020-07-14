const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser")
const session = require("express-session")

const maxAge = 1000 * 60 * 60;
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        expires: false,
        maxAge: maxAge,
        sameSite: "none"
    }
}))

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
}

// mongodb:user1password1@ds125871.mlab.com:25871/heroku_0xn0jnk7

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/character-draft";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Define API routes here
require("./routes/apiRoutes")(app);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
