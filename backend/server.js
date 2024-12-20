const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const passport = require('./middlewares/passport')
const session = require('express-session')
const app = express();
const URI = process.env.DBURI;
const userRouter = require('./routes/userRoutes');   
const requireAuth = require("./middlewares/jwtMiddleware");
mongoose.connect(URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port 4000`);
    });
    console.log('Database connected');
  })
  .catch(err => console.error('Database connection error:', err));
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false,
}))

app.use("auth/google" ,passport.initialize())
app.use(passport.session())
app.use("/api/auth" ,userRouter);
app.use(requireAuth);////////////////////////////////////
console.log("hdcnjxmk,")////////////////////////////////////////////
