const sql = require("mssql");
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

sql.connect(connStr)
	.then(conn => createTable(conn))
	.catch(err => console.log("erro! " + err));


function createTable(conn) {
	/*
		const table = new sql.Table('Clientes');
		table.create = true;
		table.columns.add('ID', sql.Int, { nullable: false, primary: true });
		table.columns.add('Nome', sql.NVarChar(150), { nullable: false });
		table.columns.add('CPF', sql.NChar(11), { nullable: false });
		table.rows.add( 'teste1', '12345678901');
		table.rows.add('teste2', '09876543210');
		table.rows.add('teste3', '12312312399');
	
		const request = new sql.Request()
		request.bulk(table)
			.then(result => console.log('funcionou'))
			.catch(err => console.log('erro no bulk. ' + err));
	}
	*/
	let stringSQL = `CREATE TABLE Clientes (
										ID int IDENTITY(1,1) PRIMARY KEY,
										Nome varchar(255),
										CPF varchar(255),
										Idade int
										);`
	execSQLQuery(conn, stringSQL);

}

function execSQLQuery(conn, sqlQry) {
	conn.request()
		.query(sqlQry)
		.then(result => console.log("Tabela cliente criada com sucesso"))
		.catch(err => console.log);
}