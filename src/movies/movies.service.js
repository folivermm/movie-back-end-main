const knex = require("../db/connection");

//- `GET /movies?is_showing=true`
//return _only those movies where the movie is currently showing in theaters._ 
//This means you will need to check the `movies_theaters` table.


function list(isShowing) {
    if (isShowing) {
        return knex("movies")
            .join("movies_theaters", "movies.movie_id", "movies_theaters.movies_id")
            .distinct()
            .select("movies.*")
            .where({ is_showing: true });
    }
    return knex("movies")
        .select("*");
}

// - `GET /movies/:movieId`
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

module.exports = {
    list,
    read,
};