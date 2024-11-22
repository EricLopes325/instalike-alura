import express from "express";
import routes from "./src/config/routes/postsRoutes.js";
// Importa o framework Express, que é fundamental para criar aplicações web Node.js.


const posts = [
    // Array que simula um banco de dados local, contendo alguns posts de exemplo.
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descrição: "Gato fazendo yoga", imagem: "https://placecats.com/300/150" },
    { id: 3, descrição: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150" }
];

const app = express();
// Cria uma instância do Express, que será o ponto de partida da nossa aplicação.
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando...");
    // Inicia o servidor Express na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto para receber requisições.
});
