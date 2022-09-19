const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()

//aplicamos um middleware
app.use(express.json())

//Base de dados do index.js só ele acessa (conceito do microsserviços)
const observacoesPorLembreteId = {}

//localhost:5000/lembretes/abcd/observacoes
//armazenar uma observação nova refeerente ao lembrete informado pelo id (ex:abcd)
app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    //Desestruturação do Javascript:
    //req.body = {texto: "Comprar açuçar"}
    /* Poderia fazer assim, mas se tiver mais um item que quiser pegar, ficaria uma linha para cada
    const texto = req.body.texto
    Então, fazendo da forma abaixo, basta ir acrescentando "," e o nome do item, dentro das {}
    */
   const {texto} = req.body
   //req.paramss é um objeto que representa os parâmentro da requisição
   //o nome id representa o id contido da URL. req.params.id
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []
    observacoesDoLembrete.push({id: idObs, texto: texto})
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete
    //201: CREATED
    res.status(201).send(observacoesDoLembrete)
})

//localhost:5000/lembretes/:id/observacoes
app.get('/lembretes/:id/observacoes', (req, res) => {
    //vc sempre devolve uma lista, ou aquela que já existe, ou uma nova
    res.send(observacoesPorLembreteId[req.params.id] || [])
})


app.listen(5000, () => console.log('Observações. Porta 5000'))