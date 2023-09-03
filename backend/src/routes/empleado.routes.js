import Router from 'express'
import { getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from '../controllers/empleado.controller.js'

const router = Router()

const useRoutesEmpleado = (app) => {
    app.use('/glob-guster', router)
    router.get('/empleado', getEmpleado)
    router.post('/empleado', createEmpleado)
    router.put('/empleado/:cod_empleado/:cod_agencia/:ciudad', updateEmpleado)
    router.delete('/empleado/:cod_empleado/:cod_agencia/:ciudad', deleteEmpleado)
}

export default useRoutesEmpleado