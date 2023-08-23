const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//UPDATE /reviews/:reviewId (incorrect ID)
async function reviewIdExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.reviewIdExists(reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({ status: 404, message: "Review cannot be found." })
}

async function readReviewsForMovie(req, res) {
    const reviews = await service.getReviewsForMovie(
        res.locals.movie.movie_id
    );
    // Create an array of promises to fetch critic details
    const criticPromises = reviews.map(review =>
        service.getCritic(review.critic_id)
    );
    // Fetch critic details concurrently using Promise.all
    const critics = await Promise.all(criticPromises);
    // Attach critic information to the corresponding reviews
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].critic = critics[i];
    }
    // Response with the list of reviews along with critic details
    res.json({ data: reviews });
}


//middlware to check update has requireed porperties 
function ReviewUpdateFieldsExists(req, res, next) {
    const { data: { score = null, content = null } = {} } = req.body;
    const updatedReview = {};
    if (!score && !content) {
        return next({
            status: 400,
            message: "Updated review is missing a score and/or content.",
        });
    }
    if (score) {
        updatedReview.score = score;
    }
    if (content) {
        updatedReview.content = content;
    }
    res.locals.update = updatedReview;
    next();
}

//UPDATE /reviews/:reviewId
async function update(req, res) {
    const updatedReviewData = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await reviewsService.update(updatedReviewData);
    const updatedReview = await service.read(res.locals.review.review_id);
    const critic = await service.getCritic(res.locals.review.critic_id);
    const reviewToReturn = {
        ...updatedReview,
        critic: critic,
    };
    res.json({ data: reviewToReturn });
}

//DELETE /reviews/:reviewId
async function destroy(req, res) {
    const { review } = res.locals;
    await service.destroy(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    readReviewsForMovie: asyncErrorBoundary(readReviewsForMovie),
    update: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(ReviewUpdateFieldsExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(destroy)],
}