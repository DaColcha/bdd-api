import getConnection from '../database.js'
import sql from 'mssql'

export const getEjemplar_info = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT num_ejemplar as id, cod_pelicula, cod_agencia, ciudad FROM Ejemplar_info')
    return res.json(result.recordset)
}

export const createEjemplar_info = async (req, res) => {  
  const {id, cod_pelicula, cod_agencia, ciudad, conservacion} = req.body;
  const pool = await getConnection()
    
  await pool
    .request()
    .input('num_ejemplar', sql.Int, id)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('cod_agencia', sql.Int, cod_agencia)
    .input('ciudad', sql.VarChar, ciudad)
    .input('conservacion', sql.Char, conservacion)
    .query('INSERT INTO Ejemplar_Conservacion (num_ejemplar, cod_pelicula, conservacion) VALUES (@num_ejemplar, @cod_pelicula, @conservacion) set xact_abort on begin distributed transaction INSERT INTO Ejemplar_info (num_ejemplar, cod_pelicula, cod_agencia, ciudad) VALUES (@num_ejemplar, @cod_pelicula, @cod_agencia, @ciudad) commit transaction');


    return res.json({
      message: 'Ejemplar Created successfully',
      body: {
        user: {
          id, cod_pelicula, cod_agencia
        }
      }
    })
  
}
  
export const deleteEjemplar_info = async (req, res)=> {
  const num_ejemplar = req.params.num_ejemplar;
  const cod_pelicula = req.params.cod_pelicula;
  const ciudad = req.params.ciudad;
  const pool = await getConnection()

  await pool
    .request()
    .input('num_ejemplar', sql.Int, num_ejemplar)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction DELETE FROM Ejemplar_info WHERE (num_ejemplar=@num_ejemplar AND cod_pelicula=@cod_pelicula AND ciudad=@ciudad) commit transaction')

  return res.json(`Ejemplar ${num_ejemplar} deleted Successfully`);

}
