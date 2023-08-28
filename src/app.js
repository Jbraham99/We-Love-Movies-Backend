if (process.env.USER) require("dotenv").config();
const express = require("express");

const theatersRouter = require("./theaters/theaters.router");
const moviesRouter = require("./movies/movies.router");

const app = express();
app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);

//Not-found handler
app.use((req, res, next) => {
    return next({
        status: 404,
        message: `The route ${req.path} Not Found.`
    })
})

app.use((error, req, res, next) => {
    const {status = 500, message = `Something went wrong`} = error;
    res.status(status).send(message)
})

module.exports = app;
