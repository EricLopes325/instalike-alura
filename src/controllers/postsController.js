import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res)  {
    // Define uma rota GET para a URL "/posts".
    const posts = await getTodosPosts()
    // Chama a função `getTodosPosts` para obter todos os posts do banco de dados.
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
    } 

    export async function postarNovoPost(req, res) {
        const novoPost = req.body;
        try {
            const postCriado = await criarPost(novoPost);
            res.status(200).json(novoPost);
        } catch(erro) {
            console.log(erro.message);
            res.status(500).jason({"Erro":"Falha na requisição"})
        }
    }

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        url: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            url: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
        
    } catch(erro) {
        console.log(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
