const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

const VALID_REVIEW = [
    "content",
    "score",
    "movie_id",
    "critic_id"
]

async function list(req, res) {
    const {movieId} = req.params;
    const response = await service.list(movieId)
    // console.log("%%%", response)
    res.json({data: response})
}

function read(req, res) {
    res.json({data: res.locals.review})
}

async function validReview(req, res, next) {
    const newReview = req.body.data//trying to get back the data and the body
    const invalidReviewProperties = Object.keys(newReview).filter((key)=> !VALID_REVIEW.includes(key))
    if (invalidReviewProperties.length) {
        return next({
            status: 400,
            message: `Invalid review field(s): ${invalidReviewProperties.join(", ")}`
        })
    }
    const review = await service.create(newReview)
    res.locals.review = review;
    next()
}

async function create(req, res) {
    const newReview = await service.create(res.locals.review)
    res.json({data: newReview})
}

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    const reviewIdNum = Number(reviewId)
    const review = await service.read(reviewIdNum)
    if (review) {
        res.locals.reviewId = reviewIdNum;
        res.locals.review = review;
        return next()
    }
    next({
        status: 404,
        message: `review ${reviewId} cannot be found.`
    })
}

async function update(req, res) {
    const {review} = res.locals
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    console.log("~~~~~", updatedReview)    
    const response = await service.update(updatedReview)
    console.log("--&UPDATE-RESPONSE&--", response)
    res.json({data: response})
}

async function destroy(req, res) {
    const response = await service.destroy(res.locals.reviewId)
    res.status(204).json({data: response})
}

function noMovieIdInPath(req, res, next) {
    if (req.params.movieId) {
        return methodNotAllowed(req, res, next)
    }
    next()
}
function movieIdInPath(req, res, next) {
    if (req.params.movieId) {
    return next()
    }
    methodNotAllowed(req, res, next)
}

module.exports = {
    list: [
        movieIdInPath,
        asyncErrorBoundary(list)
    ],
    read: [
        reviewExists,
        read
    ],
    update: [
        noMovieIdInPath,
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    delete: [
        noMovieIdInPath,
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}