import getConnection from '../database.js'
import sql from 'mssql'

export const getReseña = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT num_reseña as id, cod_pelicula, cc_socio, descripcion, calificacion, fecha FROM Reseña')
    return res.json(result.recordset)
}

export const createReseña = async (req, res) => {  
  const {id,cod_pelicula, cc_socio, descripcion, calificacion} = req.body;
  
  const pool = await getConnection()
  await pool
    .request()
    .input('num_reseña', sql.Int, id)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('cc_socio', sql.Char, cc_socio)
    .input('descripcion', sql.VarChar, descripcion)
    .input('calificacion', sql.Int, calificacion)
    .query('INSERT INTO Reseña (num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha) VALUES (@num_reseña, @cod_pelicula, @cc_socio, @descripcion, @calificacion, CONVERT(Date, GETDATE()))');

  return res.json({
    message: 'Reseña Created successfully',
    body: {id,cod_pelicula, cc_socio, descripcion, calificacion}
  })
}

  
  export const updateReseña = async (req, res) => {  
    const {id, descripcion, calificacion} = req.body;
    const pool = await getConnection()
    
    await pool
      .request()
      .input('num_reseña', sql.Int, id)
      .input('descripcion', sql.VarChar, descripcion)
      .input('calificacion', sql.Int, calificacion)
      .query('UPDATE Reseña set descripcion = @descripcion, calificacion= @calificacion , fecha = CONVERT(Date, GETDATE()) WHERE num_reseña = @num_reseña');

  
    return res.json(`Reseña ${id} updated Successfully`)
  }
  

  export const deleteReseña = async (req, res)=> {
    const num = parseInt(req.params.num)
    
    const pool = await getConnection()
    await pool.request()
    .input('num', sql.Int, num)
    .query('DELETE FROM Reseña WHERE num_reseña = @num');

    return res.json(`Reseña ${num} deleted Successfully`);
  
  }
