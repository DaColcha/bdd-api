import getConnection from '../database.js'

export const getAlquiler = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
        .query('SELECT cod_alquiler as id, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad FROM Alquiler')
    return res.json(result.recordset)
}

export const createAlquiler = async (req, res) => {  
    const {cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad} = req.body;
    const pool = await getConnection()
    const result = await pool
        .query('INSERT INTO Alquiler (cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad]);
  
    return res.json({
      message: 'Rent Created successfully',
      body: {
        user: {
            cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad
        }
      }
    })
  
  }
  
  export const updateAlquiler = async (req, res) => {  
    const {cod_alquiler, cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, ciudad} = req.body;
    const pool = await getConnection()

    const result= await pool.query('UPDATE Alquiler set cod_emp=$1, cod_agencia=$2, cc_socio=$3, num_ejemplar=$4, cod_pelicula=$5, fecha_inicio=$6, fecha_entrega=$7 WHERE (cod_alquiler = $8 AND ciudad = $9)', [cod_emp, cod_agencia, cc_socio, num_ejemplar, cod_pelicula, fecha_inicio, fecha_entrega, cod_alquiler, ciudad]);
  
    return res.json(`Rent ${cc} updated Successfully`)
  }
  

  export const deleteAlquiler = async (req, res)=> {
    const {cod_alquiler, ciudad} = req.body;
    const pool = await getConnection()
    await pool.request()
    .input('cod_alquiler', sql.Int, cod_alquiler)
    .input('ciudad', sql.VarChar, ciudad)
    .query( 'DELETE FROM Alquiler WHERE (cod_alquiler = @cod_alquiler AND ciudad = @ciudad)');

    return res.json(`Rent ${cod_alquiler}-${ciudad} deleted Successfully`);
  }