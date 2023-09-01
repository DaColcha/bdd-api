import getConnection from '../database.js'

export const getReseña = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha FROM Reseña')
    return res.json(result.recordset)
}

export const createReseña = async (req, res) => {  
    const {cod, cc, desc, calif} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Reseña (cod_pelicula, cc_socio, descripcion, calificacion, fecha) VALUES ($1, $2, $3, $4, CONVERT(Date, GETDATE()))', [cod, cc, desc, calif]);
  
    return res.json({
      message: 'Reseña Created successfully',
      body: {
        user: {
          cod, cc, desc, calif, fecha
        }
      }
    })
  
  }
  
  export const updateReseña = async (req, res) => {  
    const {num, desc, calif} = req.body;
    const pool = await getConnection()

    const response= await pool.query('UPDATE users set descripcion= $1, calificacion=$2, fecha=  CONVERT(Date, GETDATE()) WHERE num_reseña = $3', [desc, calif, num ]);
  
    return res.json(`Reseña ${num} updated Successfully`)
  }
  

  export const deleteReseña = async (req, res)=> {
    const num= parseInt(req.params.num);
  
      const response = await pool.query(
                        'DELETE FROM users WHERE num = $1', [num]);

      return res.json(`Reseña ${num} deleted Successfully`);
  
  }
