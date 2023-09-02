import sql from 'mssql'

const dbSettings = {
    user: 'sa',
    password: 'P@ssw0rd',
    server: config.server,
    database: config.database, 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export default async function getConnection() {
    const pool = await sql.connect(dbSettings)
    return pool
}
