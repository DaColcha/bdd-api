import getConnection from '../database.js'
import sql from 'mssql'

export const getPelicula = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno FROM Pelicula')
    return res.json(result.recordset)
}

export const createPelicula = async (req, res) => {
  const {cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno} = req.body;
  const pool = await getConnection()

  await pool
    .request()
    .input('cod_peli', sql.Char, cod_peli)
    .input('titulo', sql.VarChar, titulo)
    .input('cod_dir', sql.Char, cod_dir)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .input('productora', sql.VarChar, productora)
    .input('fecha_estreno', sql.Date, fecha_estreno)
    .query('INSERT INTO Pelicula (cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno) VALUES (@cod_peli, @titulo, @cod_dir, @nacionalidad, @productora, @fecha_estreno)');

  return res.json({
    message: 'Pelicula Created successfully',
    body: {cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno}
  })

}

export const updatePelicula = async (req, res) => {
  const {cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno} = req.body;
  const pool = await getConnection()

  await pool
    .request()
    .input('cod_peli', sql.Char, cod_peli)
    .input('titulo', sql.VarChar, titulo)
    .input('cod_dir', sql.Char, cod_dir)
    .input('nacionalidad', sql.VarChar, nacionalidad)
    .input('productora', sql.VarChar, productora)
    .input('fecha_estreno', sql.Date, fecha_estreno)
    .query('UPDATE Pelicula SET titulo = @titulo, cod_dir = @cod_dir, nacionalidad = @nacionalidad, productora = @productora, fecha_estreno = @fecha_estreno WHERE cod_peli = @cod_peli');

  return res.json(`Pelicula ${cod_peli} updated Successfully`)

}

export const deletePelicula = async (req, res)=> {
  const {cod_peli} = req.body;
  const pool = await getConnection()
    
  await pool
    .request()
    .input('cod_peli', sql.Char, cod_peli)
    .query('DELETE FROM Pelicula WHERE cod_peli = @cod_peli');

  return res.json(`Pelicula ${cod_peli} deleted Successfully`);

}

