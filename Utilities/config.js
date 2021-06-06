const config = {
    user: 'sa',
    password: 'Cantel466@',
    server: 'localhost',
    database: 'dailyexpense',
    options: {
      port: 1433,
      instancename: 'SQLEXPRESS',
      encrypt:true,
      enableArithAbort:true     
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 40000,
    }
}

module.exports = config;