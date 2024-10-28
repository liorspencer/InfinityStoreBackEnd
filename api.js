/*--importações e inicializações--*/
//importando o módulo dotenv para fazer acesso as variáveis de ambiente.
require('dotenv').config()
//importando o módulo básico de http.
const http = require('http');
//importando módulo ngrok, para ter um endpoint com acesso na web
const ngrok = require('@ngrok/ngrok');
//acessando a variável de ambiente SERVIDOR_PORTA
const porta = process.env.SERVIDOR_PORTA;
//importando módulo express, para facilitar requisições e respostas http
const express = require('express');
//inicializando o módulo express
const app = express();
//módulo de log das conexões estabelecidas.
const morgan = require('morgan');


/*--configurações iniciais--*/
//indicando onde o morgan deve fazer os logs.
app.use(morgan('dev'))
//indicando onde estarão as views que serão utilizadas.
app.set('views', './views');
//indicando a view engine que será utilizada.
app.set('view engine', 'ejs');
//configurando a pasta public para ser utilizada.
app.use(express.static('./public'));


//configurando rotas
app.get('/', (req, res) => {
    //res.send('rota raiz') -- MÉTODO ANTIGO
    res.render('index',{mensagem:'Rota raiz',titulo:'InfinityStore'})
})

app.get('/login', (req, res) => {
    //res.send('rota login') -- MÉTODO ANTIGO
    res.render('index',{mensagem:'Rota Login',titulo:'Login - InfinityStore'})
})

app.get('/produtos', (req, res) => {
    //res.send('rota produtos') -- MÉTODO ANTIGO
    res.render('index',{mensagem:'Rota Produtos',titulo:'Produtos - InfinityStore'})
})

app.get('/sobre', (req,res) =>{
    //res.send('rota sobre') -- MÉTODO ANTIGO
    res.render('index',{mensagem:'Rota Sobre',titulo:'Sobre - InfinityStore'})
})

//rota padrão
app.get('*', (req, res) => {
    //res.status(404).send('Rota nao encontrada') -- MÉTODO ANTIGO
    res.status(404).render('index',{mensagem:'Página não encontrada',titulo:'Página não encontrada'})
    console.log(`${req.headers['x-forwarded-for']} tentou acessar uma rota não existente.`)
});

//criando servidor web
app.listen(porta, () =>{
    console.log(`Servidor na porta ${porta}`);
})

//endpoint ngrok
ngrok.connect({ addr: porta, authtoken_from_env: true, domain: "locust-ethical-toad.ngrok-free.app"}).
then(listener => console.log(`Endpoint estabelecido em: ${listener.url()}`))