import getConnection from '../database.js'

export const getEjemplar_info = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT * fecha FROM Ejemplar_info')
    return res.json(result.recordset)
}

export const createEjemplar_info = async (req, res) => {  
    const {num_ejemplar, cod_pelicula, cod_agencia} = req.body;
    const pool = await getConnection()
   
    
  await pool
    .request()
    .input('num_ejemplar', sql.Int, num_ejemplar)
    .input('cod_pelicula', sql.Char, cod_pelicula)
    .input('cod_agencia', sql.int, cod_agencia)
    .query('set xact_abort on begin distributed transaction INSERT INTO Ejemplar_info (num_ejemplar, cod_pelicula, cod_agencia, ciudad) VALUES (@num_ejemplar, @cod_pelicula, @cod_agencia, \'guayaquil\') commit transaction');


    return res.json({
      message: 'Ejemplar Created successfully',
      body: {
        user: {
          num_ejemplar, cod_pelicula, cod_agencia
        }
      }
    })
  
}
  
export const deleteEjemplar_info = async (req, res)=> {
  const num= parseInt(req.params.num);

  await pool
    .query('begin distributed transaction')
    .query('DELETE FROM Ejemplar_info WHERE num = $1 and ciudad = \'guayaquil\'', [num])

  return res.json(`Ejemplar ${num} deleted Successfully`);

}
