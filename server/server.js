const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')


// Configuração

    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // console.log(db )


//Iniciando servidor
const PORT = 8081
app.listen(PORT,()=>{
    console.log('Servidor rodando na porta 8081')
})