import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

//Indicar para o express ler body com Json
app.use(express.json())

//retornar o objeto por id
function buscarSelecaoPorId(id) {
    return selecoes.filter( selecao => selecao.id == id)
}

//pegar a posição ou index do elemento no array por id
function buscarIndexSelecao(id) {
    return selecoes.findIndex( selecao => selecao.id == id)
}


//Rotas
app.get('/selecoes', (req, res) => {
//res.status(200).send(selecoes)
const sql = "SELECT * FROM selecoes"
conexao.query(sql, (erro, result) => {
if(erro) {
    res.status(404).json({ 'erro': erro })
} else {
    res.status(200).json(result)
}
})
})

app.get('/selecoes/:id', (req, res) => {
    //res.json(buscarSelecaoPorId(req.params.id))
    const id = req.params.id
    const sql = "SELECT * FROM selecoes WHERE id =?;"
conexao.query(sql, id, (erro, result) => {
    const linha = result[0]
if(erro) {
    res.status(404).json({ 'erro': erro })
} else {
    res.status(200).json(linha)
}
})
})

app.post('/selecoes', (req, res) => {
    //selecoes.push(req.body)
    //res.status(201).send('Seleção cadastrada com sucesso!')
    const selecao = req.body
    const sql = "INSERT INTO selecoes SET ?;"
conexao.query(sql, selecao, (erro, result) => {
if(erro) {
    res.status(400).json({ 'erro': erro })
} else {
    res.status(201).json(result)
}
})
})

app.delete('/selecoes/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM selecoes WHERE id =?;"
conexao.query(sql, id, (erro, result) => {
if(erro) {
    res.status(404).json({ 'erro': erro })
} else {
    res.status(200).json(result)
}
})
})


app.put('/selecoes/:id', (req, res) => {
    const id = req.params.id
    const selecao = req.body
    const sql = "UPDATE selecoes SET ? WHERE id=?;"
conexao.query(sql, [selecao, id], (erro, result) => {
if(erro) {
    res.status(400).json({ 'erro': erro })
} else {
    res.status(200).json(result)
}
})
})


export default app 



