import getConnection from '../database.js'

export const getEmpleado_DMQ = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_empleado, nombre, salario, cargo, cod_agencia, ciudad FROM Empleado_DMQ')
    return res.json(result.recordset)
}

export const createEmpleado_DMQ = async (req, res) => {  
    const {cod_empleado, nombre, salario, cargo, cod_agencia, ciudad} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Empleado_DMQ (cod_empleado, nombre, salario, cargo, cod_agencia, ciudad) VALUES ($1, $2, $3, $4, $5, $6)', [cod_empleado, nombre, salario, cargo, cod_agencia, ciudad]);
  
    return res.json({
      message: 'Employee Created successfully',
      body: {
        user: {
            cod_empleado, nombre, salario, cargo, cod_agencia, ciudad
        }
      }
    })
  
  }
  
  export const updateEmpleado_DMQ = async (req, res) => {  
    const {cod_empleado, nombre, salario, cargo, cod_agencia, ciudad} = req.body;
    const pool = await getConnection()

    const result= await pool.query('UPDATE Empleado_DMQ set nombre=$1, salario=$2, cargo$3 WHERE (cod_empleado = $4 AND cod_agencia = $5 AND ciudad = $6)', [ nombre, salario, cargo, cod_empleado, cod_agencia, ciudad ]);
  
    return res.json(`Employee ${cc} updated Successfully`)
  }
  

  export const deleteEmpleado_DMQ = async (req, res)=> {
    const {cod_empleado,cod_agencia, ciudad} = req.body;
    const pool = await getConnection()
    const result = await pool.query(
                        'DELETE FROM Empleado_DMQ WHERE (cod_empleado = $1 AND cod_agencia = $2 AND ciudad = $3)', [cod_empleado,cod_agencia, ciudad]);

    return res.json(`Employee ${cod_empleado}-${cod_agencia} deleted Successfully`);
  }