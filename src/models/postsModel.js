import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Estabelece a conexão com o banco de dados, utilizando a string de conexão obtida da variável de ambiente `STRING_CONEXAO`. O resultado da conexão é armazenado na variável `conexao`.

export async function getTodosPosts() {
    // Função assíncrona para obter todos os posts do banco de dados.
    const db = conexao.db("instalike-alura")
    // Obtém o banco de dados chamado "instalike-alura" a partir da conexão estabelecida.
    const colecao = db.collection("posts")
    // Obtém a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray()
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("instalike-alura")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}