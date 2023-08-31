import Router from 'express'
import getPelicula from '../controllers/pelicula.controller.js'
import createPelicula from '../controllers/pelicula.controller.js'
import updatePelicula from '../controllers/pelicula.controller.js'
import deletePelicula from '../controllers/pelicula.controller.js'
const router = Router()

router.get('/pelicula', getPelicula)
router.post('/pelicula', createPelicula)
router.put('/pelicula/:cod_peli', updatePelicula)
router.delete('/pelicula/:cod_peli', deletePelicula)

export default router