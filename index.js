const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000; //porta padrão
const sql = require('mssql');

const connStr = {
  "user": "sa",
  "password": "sa",
  "server": "localhost\\MSSQLSERVER01",
  "database": "nodesqlserver",
  "options": {
    "encrypt": true,
    "enableArithAbort": true
  },
};

//fazendo a conexão global
sql.connect(connStr)
  .then(conn => global.conn = conn)
  .catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/clientes', (req, res) => {
  execSQLQuery('SELECT * FROM Clientes', res);
});

router.get('/clientes/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM Clientes' + filter, res);
});

router.delete('/clientes/:id', (req, res) => {
  execSQLQuery('DELETE Clientes WHERE ID=' + parseInt(req.params.id), res);
});

router.post('/clientes', (req, res) => {
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  const idade = req.body.idade;
  execSQLQuery(`INSERT INTO Clientes( Nome, CPF, Idade) VALUES('${nome}','${cpf}','${idade}')`, res);
  return res.send("Incluído com sucesso");
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
  global.conn.request()
    .query(sqlQry)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));
}