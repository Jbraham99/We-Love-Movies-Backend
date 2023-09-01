const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"]
    //The other movie attributes
})

async function list(movieId) {
    /*
    SELECT *
    FROM theatres t
    JOIN movies_theaters mt ON t.theater_id = mt.theater_id
    JOIN movies m ON m.movie_id = mt.movie_id
    WHERE m.is_showing = true
    */
   return knex("theaters as t")
     .join("movies_theaters as mt","t.theater_id", "mt.theater_id")
     .join("movies as m", "mt.movie_id", "m.movie_id")
     .select("*")
     .then(data => reduceMovies(data, null))
}

module.exports = {
    list,
}