const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listTheatersShowingMovie(req, res, next) {
    if (res.locals.movie) {
        return res.json({
            data: await service.listTheatersForMovie(res.locals.movie.movie_id),
        });
    }
    next();
}

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

