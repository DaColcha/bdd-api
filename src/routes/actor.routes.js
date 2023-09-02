import Router from 'express'
import { getActor, createActor, updateActor, deleteActor } from '../controllers/actor.controller.js'

const router = Router()

const useRoutesActor = (app) => {
    app.use('/glob-guster', router)

    router.get('/actor', getActor)
    router.post('/actor', createActor)
    router.put('/actor/:cod_actor', updateActor)
    router.delete('/actor/:cod_actor', deleteActor)    
}

export default useRoutesActor