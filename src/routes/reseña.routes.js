import Router from 'express'
import getReseña from '../controllers/reseña.controller.js'
const router = Router()

router.get('/resenia', getReseña)

export default router