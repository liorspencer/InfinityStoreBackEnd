require('dotenv').config()
const http = require('http');
const ngrok = require('@ngrok/ngrok');
const porta = process.env.SERVIDOR_PORTA;
const express = require('express');
const app = express();

//configurações iniciaiS
app.use(express.static('./public'));
app.get('/', (req, res) => {
    
})

app.get('*', (req, res) => {
    res.status(404).render('erro',{mensagem:'Página não encontrada'})
});

//criando servidor web
app.listen(porta, () =>{
    console.log(`Servidor na porta ${porta}`);
})

//endpoint ngrok
ngrok.connect({ addr: porta, authtoken_from_env: true, domain: "locust-ethical-toad.ngrok-free.app"}).
then(listener => console.log(`Endpoint estabelecido em: ${listener.url()}`))