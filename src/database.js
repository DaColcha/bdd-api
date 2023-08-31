import sql from 'mssql'

const dbSettings = {
    user: 'sa',
    password: 'P@ssw0rd',
    server: 'COLCHAD\\MSSQLSERVER16',
    database: 'test', 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export default async function getConnection() {
    const pool = await sql.connect(dbSettings)
    return pool
}
