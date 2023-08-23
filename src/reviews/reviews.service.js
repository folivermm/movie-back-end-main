const knex = require("../db/connection");

// /reviews/:reviewId
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

//UPDATE /reviews/:reviewId
function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview)
}

// GET /movies/:movieId/reviews
// This route should return all the `reviews` for the movie, 
// including all the `critic` details added to a `critic` key of the review.
function readReviewsForMovie(movieId) {
    return knex("reviews")
        .select("*")
        .where({ movie_id: movieId });
}

function getCritic(criticId) {
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
}

//delete review 
function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
    read,
    update,
    readReviewsForMovie,
    getCritic,
    destroy,
};




