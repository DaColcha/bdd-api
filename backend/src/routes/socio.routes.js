import Router from 'express'
import { getSocio, createSocio, updateSocio, deleteSocio } from '../controllers/socio.controller.js'

const router = Router()

const useRoutesSocio = (app) => {
    app.use('/glob-guster', router)
    router.get('/socio', getSocio)
    router.post('/socio', createSocio)
    router.put('/socio/:cc', updateSocio)
    router.delete('/socio/:cc', deleteSocio)
}

export default useRoutesSocio