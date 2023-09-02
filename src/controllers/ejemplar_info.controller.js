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
  
//   export const updateEjemplar_info = async (req, res) => {  
//     const {num, desc, calif} = req.body;
//     const pool = await getConnection()

//     const response= await pool.query('UPDATE Reseña set descripcion= $1, calificacion=$2, fecha=  CONVERT(Date, GETDATE()) WHERE num_reseña = $3', [desc, calif, num ]);
  
//     return res.json(`Reseña ${num} updated Successfully`)
//   }
  

//   export const deleteReseña = async (req, res)=> {
//     const num= parseInt(req.params.num);
  
//       const response = await pool.query(
//                         'DELETE FROM Reseña WHERE num = $1', [num]);

//       return res.json(`Reseña ${num} deleted Successfully`);
  
//   }
