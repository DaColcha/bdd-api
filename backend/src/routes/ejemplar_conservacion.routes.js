import Router from 'express'
import { getEjemplar_Conservacion, createEjemplar_Conservacion, updateEjemplar_Conservacion, deleteEjemplar_Conservacion } from '../controllers/ejemplar_conservacion.controller.js' 

const router = Router()

const useRoutesEjemplar_Conservacion = (app) => {
    app.use('/glob-guster', router)

    router.get('/ejemplar-conservacion', getEjemplar_Conservacion)
    router.post('/ejemplar-conservacion', createEjemplar_Conservacion)
    router.put('/ejemplar-conservacion/:num_ejemplar/:cod_pelicula', updateEjemplar_Conservacion)
    router.delete('/ejemplar-conservacion/:num_ejemplar/:cod_pelicula', deleteEjemplar_Conservacion)    
}

export default useRoutesEjemplar_Conservacion