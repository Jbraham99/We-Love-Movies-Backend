const knex = require("../db/connection");

function list() {
    /*
    SELECT *
    FROM theatres t
    JOIN movies_theaters mt ON t.theater_id = mt.theater_id
    JOIN movies m ON m.movie_id = mt.movie_id
    WHERE m.is_showing = true
    */
   return knex("theaters as t")
     .select("*")
     
}

module.exports = {
    list
}