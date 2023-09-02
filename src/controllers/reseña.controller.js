import getConnection from '../database.js'
import sql from 'mssql'

export const getReseña = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha FROM Reseña')
    return res.json(result.recordset)
}

export const createReseña = async (req, res) => {  
  const {num_reseña,cod_pelicula, cc_socio, descripcion, calificacion} = req.body;
  
  const pool = await getConnection()
  await pool
    .request()
    .input('num_reseña', sql.Int, num_reseña)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('cc_socio', sql.Char, cc_socio)
    .input('descripcion', sql.VarChar, descripcion)
    .input('calificacion', sql.Int, calificacion)
    .query('INSERT INTO Reseña (num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha) VALUES (@num_reseña, @cod_pelicula, @cc_socio, @descripcion, @calificacion, CONVERT(Date, GETDATE()))');

  return res.json({
    message: 'Reseña Created successfully',
    body: {num_reseña,cod_pelicula, cc_socio, descripcion, calificacion}
  })
}

// export const createReseña = async (req, res) => {  
//     const {num_reseña,cod_pelicula, cc_socio, descripcion, calificacion} = req.body;
//     const pool = await getConnection()
//     const result = await pool
//             .query('INSERT INTO Reseña (num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha) VALUES ($1, $2, $3, $4,$5, CONVERT(Date, GETDATE()))', [num_reseña,cod_pelicula, cc_socio, descripcion, calificacion]);
  
//     return res.json({
//       message: 'Reseña Created successfully',
//       body: result
//     })
  
//   }
  
  export const updateReseña = async (req, res) => {  
    const {num, desc, calif} = req.body;
    const pool = await getConnection()

    const response= await pool.query('UPDATE Reseña set descripcion= $1, calificacion=$2, fecha=  CONVERT(Date, GETDATE()) WHERE num_reseña = $3', [desc, calif, num ]);
  
    return res.json(`Reseña ${num} updated Successfully`)
  }
  

  export const deleteReseña = async (req, res)=> {
    const num= parseInt(req.params.num);
    const pool = await getConnection()
      const response = await pool.query(
                        'DELETE FROM Reseña WHERE num_reseña = $1', [num]);

      return res.json(`Reseña ${num} deleted Successfully`);
  
  }
