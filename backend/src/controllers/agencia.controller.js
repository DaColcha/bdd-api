import getConnection from '../database.js'
import sql from 'mssql'

export const getAgencia = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_agencia, ciudad_agencia, direccion_agencia FROM Agencia')
    return res.json(result.recordset)
}

export const createAgencia = async (req, res) => {
    const {cod_agencia, ciudad_agencia, direccion_agencia} = req.body;
    const pool = await getConnection()

    await pool
      .request()
      .input('cod_agencia', sql.Int, cod_agencia)
      .input('ciudad_agencia', sql.VarChar, ciudad_agencia)
      .input('direccion_agencia', sql.VarChar, direccion_agencia)
      .query('BEGIN DISTRIBUED TRANSACTION INSERT INTO Agencia (cod_agencia, ciudad_agencia, direccion_agencia) VALUES (@cod_agencia, @ciudad_agencia, @direccion_agencia) COMMIT');

    return res.json({
      message: 'Agencia Created successfully',
      body: {cod_agencia, ciudad_agencia, direccion_agencia}
    })

}

export const updateAgencia = async (req, res) => {
    const {cod_agencia, ciudad_agencia, direccion_agencia} = req.body;
    const pool = await getConnection()

    await pool
      .request()
      .input('cod_agencia', sql.Int, cod_agencia)
      .input('ciudad_agencia', sql.VarChar, ciudad_agencia)
      .input('direccion_agencia', sql.VarChar, direccion_agencia)
      .query('BEGIN DISTRIBUED TRANSACTION UPDATE Agencia SET direccion_agencia = @direccion_agencia WHERE cod_agencia = @cod_agencia AND ciudad_agencia = @ciudad_agencia COMMIT');

    return res.json(`Agencia ${cod_agencia}-${ciudad_agencia} updated Successfully`)

}

export const deleteAgencia = async (req, res)=> {
  const {cod_agencia, ciudad_agencia} = req.body;
  const pool = await getConnection()

  await pool
    .request()
    .input('cod_agencia', sql.Int, cod_agencia)
    .input('ciudad_agencia', sql.VarChar, ciudad_agencia)
    .query('BEGIN DISTRIBUED TRANSACTION DELETE FROM Agencia WHERE cod_agencia = @cod_agencia AND ciudad_agencia = @ciudad_agencia COMMIT');

  return res.json(`Agencia ${cod_agencia}-${ciudad_agencia} deleted Successfully`);
}