import getConnection from '../database.js'
import sql from 'mssql'

export const getEmpleado = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query('SELECT cod_empleado as id, nombre, salario, cargo, cod_agencia, ciudad FROM Empleado')
  return res.json(result.recordset)
}

export const createEmpleado = async (req, res) => {
  const { id, nombre, salario, cargo, cod_agencia, ciudad } = req.body;

  const pool = await getConnection()
  await pool
    .request()
    .input('cod_empleado', sql.Int, id)
    .input('nombre', sql.VarChar, nombre)
    .input('salario', sql.Money, salario)
    .input('cargo', sql.VarChar, cargo)
    .input('cod_agencia', sql.Int, cod_agencia)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction INSERT INTO Empleado (cod_empleado, nombre, salario, cargo, cod_agencia, ciudad) VALUES (@cod_empleado, @nombre, @salario, @cargo, @cod_agencia, @ciudad) commit');

  return res.json({
    message: 'Employee Created successfully',
    body: { id, nombre, salario, cargo, cod_agencia, ciudad }
  })
}

export const updateEmpleado = async (req, res) => {
  const { id, nombre, salario, cargo, ciudad } = req.body;
  
  const pool = await getConnection()
  await pool
    .request()
    .input('cod_empleado', sql.Int, id)
    .input('nombre', sql.VarChar, nombre)
    .input('salario', sql.Money, salario)
    .input('cargo', sql.VarChar, cargo)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction UPDATE Empleado set nombre=@nombre, salario=@salario, cargo=@cargo WHERE (cod_empleado=@cod_empleado AND ciudad=@ciudad) commit');

  return res.json({
    message: `Employee ${nombre} updated Successfully`,
    body: {id, nombre, salario, cargo, ciudad}
  })
}


export const deleteEmpleado = async (req, res) => {
  const cod_empleado= parseInt(req.params.cod_empleado);
  const ciudad = req.params.ciudad;
  
  const pool = await getConnection()
  await pool
    .request()
    .input('cod_empleado', sql.Int, cod_empleado)
    .input('ciudad', sql.VarChar, ciudad)
    .query('set xact_abort on begin distributed transaction DELETE FROM Empleado WHERE cod_empleado=@cod_empleado AND ciudad=@ciudad commit');
  
  return res.json(`Employee ${cod_empleado} deleted Successfully`);
}