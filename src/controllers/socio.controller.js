import getConnection from '../database.js'

export const getSocio = async (req, res) => {    
    const pool = await getConnection()
    const result = await pool.request()
            .query('SELECT cc, nombre, telf, ciudad, direccion, garante FROM Socio')
    return res.json(result.recordset)
}

export const createSocio = async (req, res) => {  
    const {cc, nombre, telf, ciudad, direccion, garante} = req.body;
    const pool = await getConnection()
    const result = await pool
            .query('INSERT INTO Socio (cc, nombre, telf, ciudad, direccion, garante) VALUES ($1, $2, $3, $4, $5, $6)', [cc, nombre, telf, ciudad, direccion, garante]);
  
    return res.json({
      message: 'Socio Created successfully',
      body: {
        user: {
            cc, nombre, telf, ciudad, direccion, garante
        }
      }
    })
  
  }
  
  export const updateSocio = async (req, res) => {  
    const {cc, nombre, telf, ciudad, direccion, garante} = req.body;
    const pool = await getConnection()

    const result= await pool.query('UPDATE Socio set nombre=$1, telf=$2, ciudad=$3, direccion=$4, garante=$5 WHERE cc = $6', [ nombre, telf, ciudad, direccion, garante, cc ]);
  
    return res.json(`Socio ${cc} updated Successfully`)
  }
  

  export const deleteSocio = async (req, res)=> {
    const { cc } = req.body;
    const pool = await getConnection()
    const result = await pool.query(
                        'DELETE FROM Socio WHERE cc = $1', [cc]);

    return res.json(`Socio ${cc} deleted Successfully`);
  }