import getConnection from '../database.js'

export const getPelicula = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno FROM Pelicula')
    return res.json(result.recordset)
}

export const createPelicula = async (req, res) => {
    const {cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Pelicula (cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno) VALUES ($1, $2, $3, $4, $5, $6)', [cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno]);
  
    return res.json({
      message: 'Pelicula Created successfully',
      body: {
        user: {
          cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno
        }
      }
    })  
}

export const updatePelicula = async (req, res) => {
    const {cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('UPDATE Pelicula set titulo= $1, cod_dir=$2, nacionalidad=$3, productora=$4, fecha_estreno=$5 WHERE cod_peli = $6', [titulo, cod_dir, nacionalidad, productora, fecha_estreno, cod_peli]);
  
    return res.json({
      message: 'Pelicula Updated successfully',
      body: {
        user: {
          cod_peli, titulo, cod_dir, nacionalidad, productora, fecha_estreno
        }
      }
    })  
}

export const deletePelicula = async (req, res) => {
    const {cod_peli} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('DELETE FROM Pelicula WHERE cod_peli = $1', [cod_peli]);
  
    return res.json({
      message: 'Pelicula Deleted successfully',
      body: {
        user: {
          cod_peli
        }
      }
    })  
}

