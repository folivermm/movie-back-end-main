const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to list theaters showing a specific movie
// Checks if res.locals.movie contains movie info
// If a movie is found, responds with theaters showing the movie
async function listTheatersShowingMovie(req, res, next) {
    if (res.locals.movie) {
        return res.json({
            data: await service.listTheatersForMovie(res.locals.movie.movie_id),
        });
    }
    next();
}

// Route handler to list all theaters and their movies
// Use Promise.all to fetch movies for each theater 
// Then fetchs movies playing at the current theater
// adds the list of movies to the current theater
// Responds with the list of theaters and their associated movies
async function list(req, res) {
    const theaters = await service.list();
    await Promise.all(
        theaters.map(async (theater) => {
            const movies = await service.listMoviesForTheater(theater.theater_id);
            theater.movies = movies;
        })
    );
    res.json({ data: theaters });
}



module.exports = {
    list: [asyncErrorBoundary(listTheatersShowingMovie), asyncErrorBoundary(list)],
};

