import express from "express"
import { listarPosts } from "../../controllers/postsController.js";

const routes = (app) => {
    app.use (express.json());
// Habilita o middleware `express.json()`, que permite que o Express receba dados no formato JSON em requisições HTTP.
app.get("/posts", listarPosts);
}

export default routes;