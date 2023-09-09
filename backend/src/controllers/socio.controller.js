import getConnection from '../database.js'
import sql from 'mssql'

export const getSocio = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cc as id, nombre, telf, ciudad, direccion, garante FROM Socio')
    return res.json(result.recordset)
}

export const createSocio = async (req, res) => {  
    const {id, nombre, telf, ciudad, direccion, garante} = req.body;
    
    const pool = await getConnection()
    await pool
      .request()
      .input('cc', sql.Char, id)
      .input('nombre', sql.VarChar, nombre)
      .input('telf', sql.Char, telf)
      .input('ciudad', sql.VarChar, ciudad)
      .input('direccion', sql.VarChar, direccion)
      .input('garante', sql.Char, garante)  
      .query('INSERT INTO Socio (cc, nombre, telf, ciudad, direccion, garante) VALUES (@cc, @nombre, @telf, @ciudad, @direccion, @garante)');
  
    return res.json({
      message: 'Socio Created successfully'
    })
  
  }
  
  export const updateSocio = async (req, res) => {  
    const {id, nombre, telf, ciudad, direccion, garante} = req.body;
    
    const pool = await getConnection()
    await pool
      .request()
      .input('cc', sql.Char, id)
      .input('nombre', sql.VarChar, nombre)
      .input('telf', sql.Char, telf)
      .input('ciudad', sql.VarChar, ciudad)
      .input('direccion', sql.VarChar, direccion)
      .input('garante', sql.Char, garante)
      .query('UPDATE Socio set nombre=@nombre, telf=@telf, ciudad=@ciudad, direccion=@direccion, garante=@garante WHERE cc=@cc');
  
    return res.json({
      message: `Socio ${cc} updated Successfully`,
      body: {cc, nombre, telf, ciudad, direccion, garante}
    })
  }
  

  export const deleteSocio = async (req, res)=> {
    const cc = req.params.id;
    
    const pool = await getConnection()
    await pool
      .request()
      .input('cc', sql.Char, cc)
      .query('DELETE FROM Socio WHERE cc=@cc');

    return res.json(`Socio ${cc} deleted Successfully`);
  }