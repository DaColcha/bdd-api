import Router from 'express'
import getEmps from '../controllers/emps.controller.js'
const router = Router()

router.get('/emps', getEmps)

export default router