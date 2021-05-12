//API URLS

const ALL_CATEGORIES = 'https://fakestoreapi.com/products/categories'

//DOTENV CONFIG
const config = {
    HOST: process.env.HOST || "localhost",
};

//BACKEND ROUTES

const RUTA_CATEGORIES = "/categories";

module.exports = {
    //api exports
    ALL_CATEGORIES,
    //
    config,
    //routes exports
    RUTA_CATEGORIES
};
