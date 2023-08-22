
exports.up = function (knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("moviea")
            .onDelete("CASCADE");
        table.integer("category_id").unsigned().notNullable();
        table
            .foreign("theaters_id")
            .references("theaters_id")
            .inTable("theaters")
            .onDelete("CASCADE");
        table.boolean("is_showing").default(false)
    });
}
exports.down = function (knex) {
    return knex.schema.dropTable("movies_theaters");
};
