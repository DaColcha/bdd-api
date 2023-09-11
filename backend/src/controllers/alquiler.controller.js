import getConnection from '../database.js'
import sql from 'mssql'

export const getAlquiler = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_alquiler as id, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad FROM Alquiler')
    return res.json(result.recordset)
}

export const createAlquiler = async (req, res) => {  
    const {id, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, ciudad} = req.body;
    const pool = await getConnection()
    await pool
    .request()
    .input('id', sql.Int, id)
    .input('cod_emp', sql.VarChar, cod_emp)
    .input('cod_agencia', sql.Int, cod_agencia)
    .input('cc_socio', sql.Char, cc_socio)
    .input('num_ejemplar', sql.Int, num_ejemplar)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction INSERT INTO Alquiler (cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad) VALUES (@id, @cod_emp, @cod_agencia, @cc_socio, @num_ejemplar, @cod_pelicula, CONVERT(Date, GETDATE()), dateadd(day, 5,CONVERT(Date, GETDATE())), @ciudad) commit');
  
    return res.json({
      message: 'Rent Created successfully',
      body: {
        user: {
            id, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, ciudad
        }
      }
    })
  
  }
  
  export const updateAlquiler = async (req, res) => {  
    const {id, cc_socio, num_ejemplar, cod_pelicula, ciudad} = req.body;
    const pool = await getConnection()

    await pool
    .request()
    .input('cod_alquiler', sql.Int, id)
    .input('cc_socio', sql.Char, cc_socio)
    .input('num_ejemplar', sql.Int, num_ejemplar)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction UPDATE Alquiler set cc_socio=@cc_socio, num_ejemplar=@num_ejemplar, cod_pelicula=@cod_pelicula WHERE (cod_alquiler = @cod_alquiler AND ciudad = @ciudad) commit');
  
    return res.json(`Rent ${id} updated Successfully`)
  }
  

  export const deleteAlquiler = async (req, res)=> {
    const cod_alquiler = parseInt(req.params.id);
    const ciudad = req.params.ciudad;

    const pool = await getConnection()

    await pool.request()
    .input('cod_alquiler', sql.Int, cod_alquiler)
    .input('ciudad', sql.VarChar, ciudad)
    .query( 'set xact_abort on begin distributed transaction DELETE FROM Alquiler WHERE (cod_alquiler = @cod_alquiler AND ciudad = @ciudad) commit');

    return res.json(`Rent ${cod_alquiler}-${ciudad} deleted Successfully`);
  }