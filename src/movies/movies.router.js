const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

// Middleware: Check if the movie exists before proceeding with specific route
// Uses reviewsRouter when handling requests to "/:movieId/reviews"
router
    .use("/:movieId/reviews", controller.movieExists, reviewsRouter);

// Middleware: Check if the movie exists before proceeding with specific route
// Uses theatersRouter when handling requests to "/:movieId/theaters"
router
    .use("/:movieId/theaters", controller.movieExists, theatersRouter);

// Route: Shows a specific movie
router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

// Route: Lists all movies
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
