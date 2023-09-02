import getConnection from '../database.js'

export const getEjemplar_info = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT * fecha FROM Ejemplar_info')
    return res.json(result.recordset)
}

export const createEjemplar_info = async (req, res) => {  
    const {cod_pel, cod_ag} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Ejemplar_info (cod_pelicula, cod_g, ciudad) VALUES ($1, $2, \'quito\')', [cod_pel, cod_ag]);
  
    return res.json({
      message: 'Ejemplar Created successfully',
      body: {
        user: {
          cod_pel, cod_ag
        }
      }
    })
  
}
  
export const deleteEjemplar_info = async (req, res)=> {
  const num= parseInt(req.params.num);

    const response = await pool.query(
                      'DELETE FROM Ejemplar_info WHERE num = $1 and ciudad = quito', [num]);

    return res.json(`Reseña ${num} deleted Successfully`);

}
