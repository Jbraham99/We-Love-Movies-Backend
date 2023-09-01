const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")
const mapProperties = require("../utils/map-properties");

// const reduceCritics = mapProperties("critic_id", {
//     critic_id: ["critic", null, "critic_id"],
//     organization_name: ["critic", null, "organization_name"],
//     preferred_name: ["critic", null, "preferred_name"],
//     surname: ["critic", null, "surname"]

// })

// const addCritic = mapProperties({
//       critic_id: "critic.critic_id",
//       organization_name: "critic.organization_name",
//       surname: "critic.surname",
//       preferred_name: "critic.preferred_name"
//     });

// function list(movieId) {
//     /* 
//     SELECT reviews.*, critics.*
//     FROM reviews ON reviews.critic_id = critics.critic_id
//     WHERE movie_id = movieId
//     */
//     return knex("reviews")
//       .join("critics", "critics.critic_id", "reviews.critic_id")
//       .where("movie_id", movieId)
//     //   .then(reduceCritics)
//       .then(data => {
//         // console.log(data)
//         return data.map(addCritic)
//     })
// }
async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first()
}

async function list(movie_id) {
  return knex("reviews").where({ movie_id }).then((reviews) => Promise.all(reviews.map(addCritic)))
}

// add critic info
async function addCritic(review) {
  // get critic id
  review.critic = await readCritic(review.critic_id) 
  return review;
}

async function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review)
    .returning("*")
    .then(() => read(review.review_id))
    .then(addCritic);
}

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where({review_id: reviewId})
      .first()
}

// function update(updatedReview) {
//     /*
//     UPDATE FROM reviews
//     WHERE reviews.review_id = updatedReview.review_id
//     */
//     return knex("reviews")
//     .join("critics", "reviews.critic_id", "critics.critic_id")
//     .select("*")
//     .where({review_id: updatedReview.review_id})
//     .update(updatedReview, "*")
// }

function destroy(reviewId) {
    return knex('reviews')
      .where({"review_id": reviewId})
      .del()
}

module.exports = {
    list,
    read,
    update,
    destroy
}