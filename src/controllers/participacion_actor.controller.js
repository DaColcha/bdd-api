import getConnection from '../database.js'

export const getParticipacion_Actor = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_pelicula, cod_actor, salario, tipo_actor FROM Participacion_Actor')
    return res.json(result.recordset)
}

export const createParticipacion_Actor = async (req, res) => {
    const { cod_pelicula, cod_actor, salario, tipo_actor } = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('INSERT INTO Participacion_Actor (cod_pelicula, cod_actor, salario, tipo_actor) VALUES ($1, $2, $3, $4)', [cod_pelicula, cod_actor, salario, tipo_actor]);

    return res.json({
        message: 'Participation Created successfully',
        body: {
            user: {
                cod_pelicula, cod_actor, salario, tipo_actor
            }
        }
    })
}

export const updateParticipacion_Actor = async (req, res) => {
    const { cod_pelicula, cod_actor, salario, tipo_actor } = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('UPDATE Participacion_Actor set salario=$1, tipo_actor=$2 WHERE (cod_pelicula = $3 AND cod_actor = $4)', [salario, tipo_actor, cod_pelicula, cod_actor]);

    return res.json({
        message: 'Participation Updated successfully',
        body: {
            user: {
                cod_pelicula, cod_actor, salario, tipo_actor
            }
        }
    })
}

export const deleteParticipacion_Actor = async (req, res) => {
    const { cod_pelicula, cod_actor } = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('DELETE FROM Participacion_Actor WHERE (cod_pelicula = $1 AND cod_actor = $2)', [cod_pelicula, cod_actor]);

    return res.json({
        message: 'Participation Deleted successfully',
        body: {
            user: {
                cod_pelicula, cod_actor
            }
        }
    })
}
