const knex = require("../db/connection");

// Get all theaters
function list() {
    return knex("theaters")
        .select("*");
}

// route should return all the `theaters` and, the movies playing at each 
//theatre added to the `movies` key
function listTheatersForMovie(theaterId) {
    return knex("movies_theaters")
        .join("movies", "movies_theaters.movie_id", "movies.movie_id")
        .where({ theater_id: theaterId })
        .select("movies.*")
}
// // GET /movies/:movieId/theaters = `/movies/1/theaters`
// // This route should return all the `theaters` where the movie is playing.
// uses `movies_theaters` table. 
function listMoviesForTheater(movieId) {
    return knex("theaters")
        .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .where({ movie_id: movieId })
        .select("theaters.*")
}

module.exports = {
    list,
    listTheatersForMovie,
    listMoviesForTheater,
};

