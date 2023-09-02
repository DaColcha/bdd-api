import Router from 'express'
import { getEjemplar_info, createEjemplar_info, deleteEjemplar_info } from '../controllers/ejemplar_info.controller' 

const router = Router()

const useRoutesDirector = (app) => {
    app.use('/glob-guster', router)

    router.get('/ejemplar-info', getEjemplar_info)
    router.post('/ejemplar-info', createEjemplar_info)
    router.delete('/ejemplar-info/:num', deleteEjemplar_info)    
}

export default useRoutesDirector