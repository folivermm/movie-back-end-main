const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// GET /movies/:movieId (incorrect ID)
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie
        return next();
    }
    next({ status: 404, message: "Movie cannot be found" })
}

// read movies/:movie_id 
async function read(req, res) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

// list movies /movies
async function list(req, res) {
    const data = await service.list(req.query.is_showing)
    res.json({ data })
}


module.exports = {
    movieExists: asyncErrorBoundary(movieExists),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list),
};