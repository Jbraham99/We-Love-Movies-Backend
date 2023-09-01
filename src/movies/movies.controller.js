const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const response = await service.list()
    res.json({data: response})
}

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movieIdNumber = Number(movieId);
    const movie = await service.read(movieIdNumber);
    // console.log("*MOVIE*", movie)
    if (movie) {
        res.locals.movie = movie;
        return next()
    }
    next({
        status: 404,
        message: `movie with the id ${req.params.movieId} not found.`
    })
}

async function read(req, res) {
    res.json({data: res.locals.movie})
}

module.exports = {
    list,
    read: [
        movieExists,
        read
    ],
    movieExists
}