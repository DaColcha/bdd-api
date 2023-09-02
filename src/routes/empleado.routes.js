import Router from 'express'
import { getEmpleado_DMQ, createEmpleado_DMQ, updateEmpleado_DMQ, deleteEmpleado_DMQ } from '../controllers/empleado.controller'

const router = Router()

router.get('/empleado', getEmpleado_DMQ)
router.post('/empleado', createEmpleado_DMQ)
router.put('/empleado/:cod_empleado, cod_agencia, ciudad', updateEmpleado_DMQ)
router.delete('/empleado/:cod_empleado, cod_agencia, ciudad', deleteEmpleado_DMQ)

export default router