import getConnection from '../database.js'

export const getReseña = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT num_reseña, cod_pelicula, cc_socio, descripcion, calificacion, fecha FROM Reseña')
    res.json(result.recordset)
}

export const createReseña = async (req, res) => {  
    const {cod, cc, desc, calif, fecha} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Reseña (cod_pelicula, cc_socio, descripcion, calificacion, fecha) VALUES ($1, $2, $3, $4, $5, $6)', [num, cod, cc, desc, calif, fecha]);
  
    return res.json({
      message: 'Reseña Created successfully',
      body: {
        user: {
          cod, cc, desc, calif, fecha
        }
      }
    })
  
  }
  
//   export const updateUser = async (req: Request, res: Response): Promise<Response>=> {
//     const id: number = parseInt(req.params.id);
//     const {name, email} = req.body;
  
//     const response: QueryResult = await pool.query('UPDATE users set name= $1, email=$2 WHERE id = $3', [name, email, id]);
  
//     return res.json(`User ${id} updated Successfully`)
//   }
  
//   export const deleteUser = async (req: Request, res: Response): Promise<Response>=> {
//     const id: number = parseInt(req.params.id);
  
//       const response: QueryResult = await pool.query(
//                         'DELETE FROM users WHERE id = $1', [id]);
//       return res.json(`User ${id} deleted Successfully`);
  
//   }
