import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Pcezar11@*',
    database: 'bd-copa'
})

conexao.connect()


export default conexao