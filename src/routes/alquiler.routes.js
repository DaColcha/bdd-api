import Router from 'express'
import { getAlquiler, createAlquiler, updateAlquiler, deleteAlquiler } from '../controllers/alquiler.controller.js'

const router = Router()

const useRoutesAlquiler = (app) => {
    app.use('/glob-guster', router)

    router.get('/alquiler', getAlquiler)
    router.post('/alquiler', createAlquiler)
    router.put('/alquiler/:cod_alquiler/:ciudad', updateAlquiler)
    router.delete('/alquiler/:cod_alquiler/:ciudad', deleteAlquiler)
}

export default useRoutesAlquiler