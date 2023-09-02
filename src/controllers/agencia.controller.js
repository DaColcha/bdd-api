import getConnection from '../database.js'

export const getAgencia = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_agencia, ciudad_agencia, direccion_agencia FROM Agencia')
    return res.json(result.recordset)
}

export const createAgencia = async (req, res) => {
    const {cod_agencia, ciudad_agencia, direccion_agencia} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Agencia (cod_agencia, ciudad_agencia, direccion_agencia) VALUES ($1, $2, $3)', [cod_agencia, ciudad_agencia, direccion_agencia]);
  
    return res.json({
      message: 'Agencia Created successfully',
      body: {
        user: {
          cod_agencia, ciudad_agencia, direccion_agencia
        }
      }
    })  
}

export const updateAgencia = async (req, res) => {
    const {cod_agencia, ciudad_agencia, direccion_agencia} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('UPDATE Agencia set direccion_agencia=$1 WHERE cod_agencia = $2 AND ciudad_agencia= $3', [direccion_agencia, cod_agencia, ciudad_agencia]);
  
    return res.json({
      message: 'Agencia Updated successfully',
      body: {
        user: {
          cod_agencia, ciudad_agencia, direccion_agencia
        }
      }
    })  
}

export const deleteAgencia = async (req, res) => {
    const {cod_agencia} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('DELETE FROM Agencia WHERE cod_agencia = $1 AND ciudad_agencia = $2', [cod_agencia, ciudad_agencia]);
  
    return res.json({
      message: 'Agencia Deleted successfully',
      body: {
        user: {
          cod_agencia
        }
      }
    })  
}