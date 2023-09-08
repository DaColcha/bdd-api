import getConnection from '../database.js'
import sql from 'mssql'

export const getAlquiler = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_alquiler as id, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad FROM Alquiler')
    return res.json(result.recordset)
}

export const createAlquiler = async (req, res) => {  
    const {cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad} = req.body;
    const pool = await getConnection()
    await pool
    .request()
    .input('cod_alquiler', sql.Int, cod_alquiler)
    .input('cod_emp', sql.VarChar, cod_emp)
    .input('cod_agenica', sql.Int, cod_agencia)
    .input('cc_socio', sql.Char, cargo)
    .input('num_ejemplar', sql.Int, num_ejemplar)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('fecha_inicio', sql.Date, fecha_inicio)
    .input('fecha_entrega', sql.Date, fecha_entrega)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction INSERT INTO Alquiler (cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad) VALUES (@cod_alquiler, @cod_emp, @cod_agencia, @cc_socio, @num_ejemplar, @cod_pelicula, @fecha_inicio, @fecha_entrega, @ciudad) commit');
  
    return res.json({
      message: 'Rent Created successfully',
      body: {
        user: {
            cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad
        }
      }
    })
  
  }
  
  export const updateAlquiler = async (req, res) => {  
    const {cod_alquiler, fecha_inicio, fecha_entrega, ciudad} = req.body;
    const pool = await getConnection()

    await pool
    .request()
    .input('cod_alquiler', sql.Int, cod_alquiler)
    .input('fecha_inicio', sql.Date, fecha_inicio)
    .input('fecha_entrega', sql.Date, fecha_entrega)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction UPDATE Alquiler set fecha_inicio=@fecha_inicio, fecha_entrega=@fecha_entrega WHERE (cod_alquiler = @cod_alquiler AND ciudad = @ciudad) commit');
  
    return res.json(`Rent ${cod_alquiler} updated Successfully`)
  }
  

  export const deleteAlquiler = async (req, res)=> {
    const {cod_alquiler, ciudad} = req.body;
    const pool = await getConnection()
    await pool.request()
    .input('cod_alquiler', sql.Int, cod_alquiler)
    .input('ciudad', sql.VarChar, ciudad)
    .query( 'set xact_abort on begin distributed transaction DELETE FROM Alquiler WHERE (cod_alquiler = @cod_alquiler AND ciudad = @ciudad) commit');

    return res.json(`Rent ${cod_alquiler}-${ciudad} deleted Successfully`);
  }