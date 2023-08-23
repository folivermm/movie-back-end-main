const knex = require("../db/connection");

// table query to handle GET /reviews/:reviewId
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

// table query to handle UPDATE /reviews/:reviewId
function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview)
}

// table query to handle GET /movies/:movieId/reviews
// this shows all the `reviews` for the movie 
function readReviewsForMovie(movieId) {
    return knex("reviews")
        .select("*")
        .where({ movie_id: movieId });
}

// table query to include all the `critic` details in /movies/:movieId/reviews 
function getCritic(criticId) {
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
}

// table query to DELETE review 
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