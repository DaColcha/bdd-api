import getConnection from '../database.js'

const getEmps = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM Emps')
    res.json(result.recordset)
}

export default getEmps