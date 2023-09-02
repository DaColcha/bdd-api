import getConnection from '../database.js'

export const getDirector = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_director, nombre_dir, nacionalidad_dir FROM Director')
    return res.json(result.recordset)
}

export const createDirector = async (req, res) => {
    const {cod_director, nombre_dir, nacionalidad_dir} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('INSERT INTO Director (cod_director, nombre_dir, nacionalidad_dir) VALUES ($1, $2, $3)', [cod_director, nombre_dir, nacionalidad_dir]);
  
    return res.json({
      message: 'Director Created successfully',
      body: {
        user: {
            cod_director, nombre_dir, nacionalidad_dir
        }
      }
    })  
}

export const updateDirector = async (req, res) => {
    const {cod_director, nombre_dir, nacionalidad_dir} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('UPDATE Director set nombre_dir= $1, nacionalidad_dir=$2 WHERE cod_director = $3', [nombre_dir, nacionalidad_dir, cod_director]);
  
    return res.json({
      message: 'Director Updated successfully',
      body: {
        user: {
            cod_director, nombre_dir, nacionalidad_dir
        }
      }
    })  
}

export const deleteDirector = async (req, res) => {
    const {cod_director} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('DELETE FROM Director WHERE cod_director = $1', [cod_director]);
  
    return res.json({
      message: 'Director Deleted successfully',
      body: {
        user: {
            cod_director
        }
      }
    })  
}