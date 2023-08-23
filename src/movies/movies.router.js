const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

router
    .use("/:movieId/reviews")
    .get(controller.movieExists, reviewsRouter)
    .all(methodNotAllowed);


router
    .use("/:movieId/theaters")
    .get(controller.movieExists, theatersRouter)
    .all(methodNotAllowed);


router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);


router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
