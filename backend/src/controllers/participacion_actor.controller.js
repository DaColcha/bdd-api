import getConnection from '../database.js'
import sql from 'mssql'

export const getParticipacion_Actor = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_pelicula, cod_actor, salario, tipo_actor FROM Participacion_Actor')
    return res.json(result.recordset)
}

export const createParticipacion_Actor = async (req, res) => {
    const { cod_pelicula, cod_actor, salario, tipo_actor } = req.body;
    
    const pool = await getConnection()
    await pool
        .request()
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .input('cod_actor', sql.Char, cod_actor)
        .input('salario', sql.Money, salario)
        .input('tipo_actor', sql.VarChar, tipo_actor)
        .query('INSERT INTO Participacion_Actor (cod_pelicula, cod_actor, salario, tipo_actor) VALUES (@cod_pelicula, @cod_actor, @salario, @tipo_actor)');

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
    await pool
        .request()
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .input('cod_actor', sql.Char, cod_actor)
        .input('salario', sql.Money, salario)
        .input('tipo_actor', sql.VarChar, tipo_actor)
        .query('UPDATE Participacion_Actor set salario=@salario, tipo_actor=@tipo_actor WHERE (cod_pelicula=@cod_pelicula AND cod_actor=@cod_actor)');

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
    await pool
        .request()
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .input('cod_actor', sql.Char, cod_actor)
        .query('DELETE FROM Participacion_Actor WHERE (cod_pelicula=@cod_pelicula AND cod_actor=@cod_actor)');

    return res.json({
        message: 'Participation Deleted successfully',
        body: {
            user: {
                cod_pelicula, cod_actor
            }
        }
    })
}
