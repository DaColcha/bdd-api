import Router from 'express'
import {getReseña, createReseña, updateReseña, deleteReseña} from '../controllers/reseña.controller.js'

const router = Router()

const useRoutesReseña = (app)=> {
    app.use('/glob-guster', router)

    router.get('/resenia', getReseña)
    router.post('/resenia', createReseña)
    router.put('/resenia/:num', updateReseña)
    router.delete('/resenia/:num', deleteReseña)
}

export default useRoutesReseña