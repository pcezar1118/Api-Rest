import express from 'express'

const app = express()

//Indicar para o express ler body com Json
app.use(express.json())

//mock
const selecoes = [
{id: 1, selecao: 'Brasil', grupo: 'G'},
{id: 2, selecao: 'Suíça', grupo: 'G'},
{id: 3, selecao: 'Sérvia', grupo: 'G'},
{id: 4, selecao: 'Camarões', grupo: 'G'}
]


//retornar o objeto por id
function buscarSelecaoPorId(id) {
    return selecoes.filter( selecao => selecao.id == id)
}

//pegar a posição ou index do elemento no array por id
function buscarIndexSelecao(id) {
    return selecoes.findIndex( selecao => selecao.id == id)
}


//Criar rota padrão ou raiz
app.get('/', (req, res) => {
    res.send('Curso de Node JS')
})

app.get('/selecoes', (req, res) => {
res.status(200).send(selecoes)
})

app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorId(req.params.id))
})

app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id ${req.params.id}excluída com sucesso!`)
})


app.put('/selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo   = req.body.grupo
    res.json(selecoes)
})


export default app 



