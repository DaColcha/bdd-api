import Router from 'express'
import { getDirector, createDirector, updateDirector, deleteDirector } from '../controllers/director.controller.js'

const router = Router()

const useRoutesDirector = (app) => {
    app.use('/glob-guster', router)

    router.get('/director', getDirector)
    router.post('/director', createDirector)
    router.put('/director/:cod_director', updateDirector)
    router.delete('/director/:cod_director', deleteDirector)    
}

export default useRoutesDirector