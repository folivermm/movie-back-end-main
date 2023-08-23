const knex = require("../db/connection");

// table query to handle /theaters
function list() {
    return knex("theaters")
        .select("*");
}

// movies and theaters have a many to many realtionship...
// table query to handle /theaters/:theaterId
// shows all the movies in a theater
// uses movies_theaters and movies table
function listMoviesForTheater(theaterId) {
    return knex("movies_theaters")
        .join("movies", "movies_theaters.movie_id", "movies.movie_id")
        .where({ theater_id: theaterId })
        .select("movies.*")
}

// table query to GET /movies/:movieId/theaters = `/movies/1/theaters`
// shows all the theaters where the movie is playing
// uses theaters and movies_theaters table 
function listTheatersForMovie(movieId) {
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

