import Router from 'express'
import {getPelicula, createPelicula, updatePelicula,deletePelicula } from '../controllers/pelicula.controller.js'

const router = Router()

const useRoutesPelicula = (app)=> {
    app.use('/glob-guster', router)

    router.get('/pelicula', getPelicula)
    router.post('/pelicula', createPelicula)
    router.put('/pelicula/:cod_peli', updatePelicula)
    router.delete('/pelicula/:cod_peli', deletePelicula)
}

export default useRoutesPelicula