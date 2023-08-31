import getConnection from '../database.js'

export const getEmps = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM Emps')
    res.json(result.recordset)
}

// export const createUser = async (req: Request, res: Response): Promise<Response>=> {
//     const {name, email} = req.body;
//     const response: QueryResult = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  
//     return res.json({
//       message: 'User Created successfully',
//       body: {
//         user: {
//           name,
//           email
//         }
//       }
//     })
  
//   }
  
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
