const knex = require("../db/connection")

function list() {
    return knex("movies")
    .select("*")
}

function read(movieId) {
    /*
    SELECT *
    FROM movies m
    WHERE m.movie_id = movieId
    */
   return knex("movies")
   .select("*")
   .where({
    movie_id: movieId
   })
   .first()
}

module.exports = {
    list,
    read
}