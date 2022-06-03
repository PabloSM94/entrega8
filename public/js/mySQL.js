const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'test'
    }
}

const optionsSQLite = {
    client: 'sqlite3',
    connection: {filename: "../db/ecommerce.sqlite"},
    useNullAsDefault: true
}

export  {
    options,
    optionsSQLite
}