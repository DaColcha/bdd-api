import getConnection from '../database.js'

export const getActor = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_actor, nombre_act, nacionalidad_act, genero FROM Actor')
    return res.json(result.recordset)
}

export const createActor = async (req, res) => {
    const {cod_actor, nombre_act, nacionalidad_act, genero} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('INSERT INTO Actor (cod_actor, nombre_act, nacionalidad_act, genero) VALUES ($1, $2, $3, $4)', [cod_actor, nombre_act, nacionalidad_act, genero]);
  
    return res.json({
      message: 'Actor Created successfully',
      body: {
        user: {
            cod_actor, nombre_act, nacionalidad_act, genero
        }
      }
    })  
}

export const updateActor = async (req, res) => {
    const {cod_actor, nombre_act, nacionalidad_act, genero} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('UPDATE Actor set nombre_act= $1, nacionalidad_act=$2, genero=$3 WHERE cod_actor = $4', [nombre_act, nacionalidad_act, genero, cod_actor]);
  
    return res.json({
      message: 'Actor Updated successfully',
      body: {
        user: {
            cod_actor, nombre_act, nacionalidad_act, genero
        }
      }
    })  
}

export const deleteActor = async (req, res) => {
    const {cod_actor} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('DELETE FROM Actor WHERE cod_actor = $1', [cod_actor]);
  
    return res.json({
      message: 'Actor Deleted successfully',
      body: {
        user: {
            cod_actor
        }
      }
    })  
}