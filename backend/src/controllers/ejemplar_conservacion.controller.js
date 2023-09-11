import getConnection from '../database.js'
import sql from 'mssql'

export const getEjemplar_Conservacion = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT num_ejemplar as id, cod_pelicula, conservacion FROM Ejemplar_Conservacion')
    return res.json(result.recordset)
}

export const createEjemplar_Conservacion = async (req, res) => {
    const { id, cod_pelicula, conservacion } = req.body;
    const pool = await getConnection()

    await pool
        .request()
        .input('num_ejemplar', sql.Int, id)
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .input('conservacion', sql.Char, conservacion)
        .query('INSERT INTO Ejemplar_Conservacion (num_ejemplar, cod_pelicula, conservacion) VALUES (@num_ejemplar, @cod_pelicula, @conservacion)');


    return res.json({
        message: 'Ejemplar_Conservacion Created successfully',
        body: {
            user: {
                num_ejemplar, cod_pelicula, conservacion
            }
        }
    })

}

export const updateEjemplar_Conservacion = async (req, res) => {
    const { id, cod_pelicula, conservacion } = req.body;
    const pool = await getConnection()
    await pool
        .request()
        .input('num_ejemplar', sql.Int, id)
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .input('conservacion', sql.Char, conservacion)
        .query('UPDATE Ejemplar_Conservacion set conservacion=@conservacion WHERE (num_ejemplar=@num_ejemplar AND cod_pelicula=@cod_pelicula)');

    return res.json({
        message: 'Ejemplar_Conservacion Updated successfully',
        body: {
            user: {
                id, cod_pelicula, conservacion
            }
        }
    })
}

export const deleteEjemplar_Conservacion = async (req, res) => {
    const num_ejemplar = req.params.num_ejemplar;
    const cod_pelicula = req.params.cod_pelicula;
    const pool = await getConnection()

    await pool
        .request()
        .input('num_ejemplar', sql.Int, num_ejemplar)
        .input('cod_pelicula', sql.Char, cod_pelicula)
        .query('DELETE FROM Ejemplar_Conservacion WHERE (num_ejemplar=@num_ejemplar AND cod_pelicula=@cod_pelicula)')

    return res.json(`Ejemplar_Conservacion ${num_ejemplar}-${cod_pelicula} deleted Successfully`);

}
