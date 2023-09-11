import getConnection from '../database.js'
import sql from 'mssql'

export const getPelicula = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_pelicula as id, titulo, cod_director, nacionalidad, productora, fecha FROM Pelicula')
    return res.json(result.recordset)
}

export const createPelicula = async (req, res) => {
  const {id, cod_director, titulo, nacionalidad, productora, fecha} = req.body;
  const pool = await getConnection()

  await pool
    .request()
    .input('cod_peli', sql.Char, id)
    .input('titulo', sql.VarChar, titulo)
    .input('cod_dir', sql.Char, cod_director)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .input('productora', sql.VarChar, productora)
    .input('fecha_estreno', sql.Date, fecha)
    .query('INSERT INTO Pelicula (cod_pelicula, cod_director, titulo, nacionalidad, productora, fecha) VALUES (@cod_peli, @cod_dir, @titulo, @nacionalidad, @productora, @fecha_estreno)');

  return res.json({
    message: 'Pelicula Created successfully',
    body: {id, titulo, cod_director, nacionalidad, productora, fecha}
  })

}

export const updatePelicula = async (req, res) => {
  const {id, cod_director, titulo, nacionalidad, productora, fecha} = req.body;
  const pool = await getConnection()

  await pool
    .request()
    .input('cod_peli', sql.Char, id)
    .input('titulo', sql.VarChar, titulo)
    .input('cod_dir', sql.Char, cod_director)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .input('productora', sql.VarChar, productora)
    .input('fecha_estreno', sql.Date, fecha)
    .query('UPDATE Pelicula SET titulo = @titulo, cod_director = @cod_dir, nacionalidad = @nacionalidad, productora = @productora, fecha = @fecha_estreno WHERE cod_pelicula = @cod_peli');

  return res.json(`Pelicula ${id} updated Successfully`)

}

export const deletePelicula = async (req, res)=> {
  const {id} = req.body;
  const pool = await getConnection()
    
  await pool
    .request()
    .input('cod_peli', sql.Char, id)
    .query('DELETE FROM Pelicula WHERE cod_pelicula = @cod_peli');

  return res.json(`Pelicula ${id} deleted Successfully`);

}

