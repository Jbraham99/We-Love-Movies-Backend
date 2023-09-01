const knex = require("../db/connection")

function list() {
  /*
  SELECT movies.*
  FROM movies
  JOIN movies_theaters ON movies_theaters.movie_id = movies.movie_id
  WHERE movies_theaters.is_showing = true
  GROUP BY movies.movie_id
  
  */
    return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .select("movies.*")
    .where("movies_theaters.is_showing", true)
    .groupBy("movies.movie_id")
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