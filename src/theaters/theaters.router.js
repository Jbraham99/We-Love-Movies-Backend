const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const moviesRouter = require("../movies/movies.router")

// router.use("/:movieId/theaters", moviesRouter)

router.route("/").get(controller.list)

module.exports = router