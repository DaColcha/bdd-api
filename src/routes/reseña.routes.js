import Router from 'express'
import getReseña from '../controllers/reseña.controller.js'
const router = Router()

router.get('/resenia', getReseña)
//router.post('/resenia', createReseña)
// router.put('/resenia/:num', updateReseña)
// router.delete('/resenia/:num', deleteReseña)

export default router