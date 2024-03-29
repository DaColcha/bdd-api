import Router from 'express'
import { getEjemplar_info, createEjemplar_info, deleteEjemplar_info } from '../controllers/ejemplar_info.controller.js' 

const router = Router()

const useRoutesEjemplar_info = (app) => {
    app.use('/glob-guster', router)

    router.get('/ejemplar-info', getEjemplar_info)
    router.post('/ejemplar-info', createEjemplar_info)
    router.delete('/ejemplar-info/:num_ejemplar/:cod_pelicula/:ciudad', deleteEjemplar_info)    
}

export default useRoutesEjemplar_info