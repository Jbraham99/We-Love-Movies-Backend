const router = require("express").Router({mergeParams: true})
const controller = require("./movies.controller")
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")
const cors = require("cors");
const methodNotAllowed = require("../errors/MethodNotAllowed")

router.use(cors())


router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.use("/:movieId/theaters", theatersRouter).all(methodNotAllowed);
router.use("/:movieId/reviews", reviewsRouter).all(methodNotAllowed);


module.exports = router