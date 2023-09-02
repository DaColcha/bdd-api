import sql from 'mssql'
import config from './config'

const dbSettings = {
    user: 'sa',
    password: 'P@ssw0rd',
    server: 'DESKTOP-QBB9M7S\\MSSQLSERVER2',
    database: 'globguster_DMQ', 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export default async function getConnection() {
    const pool = await sql.connect(dbSettings)
    return pool
}
