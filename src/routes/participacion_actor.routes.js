import Router from 'express'
import { getParticipacion_Actor, createParticipacion_Actor, updateParticipacion_Actor, deleteParticipacion_Actor } from '../controllers/participacion_actor.controller.js'

const router = Router()

router.get('/participacion_actor', getParticipacion_Actor)
router.post('/participacion_actor', createParticipacion_Actor)
router.put('/participacion_actor/:cod_pelicula, cod_actor', updateParticipacion_Actor)
router.delete('/participacion_actor/:cod_pelicula, cod_actor', deleteParticipacion_Actor)

export default router