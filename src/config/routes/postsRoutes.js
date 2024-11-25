import express from "express"
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use (express.json());
// Habilita o middleware `express.json()`, que permite que o Express receba dados no formato JSON em requisições HTTP.
app.get("/posts", listarPosts);
// Rota para buscar todos os posts
app.post("/posts", postarNovoPost)
// Rota para criar um post
app.post ("/upload", upload.single("imagem"), uploadImagem)
}

export default routes;