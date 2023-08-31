import Router from 'express'
import getAgencia from '../controllers/agencia.controller.js'
import createAgencia from '../controllers/agencia.controller.js'
import updateAgencia from '../controllers/agencia.controller.js'
import deleteAgencia from '../controllers/agencia.controller.js'
const router = Router()

router.get('/agencia', getAgencia)
router.post('/agencia', createAgencia)
router.put('/agencia/:cod_agencia', updateAgencia)
router.delete('/agencia/:cod_agencia', deleteAgencia)

export default router