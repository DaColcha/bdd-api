import getConnection from '../database.js'

export const getEmpleado = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cod_empleado, nombre, salario, cargo, cod_agencia, ciudad FROM Empleado')
    return res.json(result.recordset)
}

export const createEmpleado = async (req, res) => {  
    const {cod_empleado, nombre, salario, cargo, cod_agencia, ciudad} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Empleado (cod_empleado, nombre, salario, cargo, cod_agencia, ciudad) VALUES ($1, $2, $3, $4, $5, $6)', [cod_empleado, nombre, salario, cargo, cod_agencia, ciudad]);
  
    return res.json({
      message: 'Employee Created successfully',
      body: {
        user: {
            cod_empleado, nombre, salario, cargo, cod_agencia, ciudad
        }
      }
    })
  
  }
  
  export const updateEmpleado = async (req, res) => {  
    const {cod_empleado, nombre, salario, cargo, cod_agencia, ciudad} = req.body;
    const pool = await getConnection()

    const result= await pool.query('UPDATE Empleado set nombre=$1, salario=$2, cargo=$3 WHERE (cod_empleado = $4 AND cod_agencia = $5 AND ciudad = $6)', [ nombre, salario, cargo, cod_empleado, cod_agencia, ciudad ]);
  
    return res.json(`Employee ${cc} updated Successfully`)
  }
  

  export const deleteEmpleado = async (req, res)=> {
    const {cod_empleado,cod_agencia, ciudad} = req.body;
    const pool = await getConnection()
    const result = await pool.query(
                        'DELETE FROM Empleado WHERE (cod_empleado = $1 AND cod_agencia = $2 AND ciudad = $3)', [cod_empleado,cod_agencia, ciudad]);

    return res.json(`Employee ${cod_empleado}-${cod_agencia} deleted Successfully`);
  }