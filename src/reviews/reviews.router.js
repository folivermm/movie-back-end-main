const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route: Updates and deletes a specific review
router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

// Route: Lists reviews for movie
router
    .route("/")
    .get(controller.readReviewsForMovie)
    .all(methodNotAllowed);



module.exports = router