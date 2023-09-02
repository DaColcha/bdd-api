import express from 'express'
import useRoutesReseña from './routes/reseña.routes.js'
import useRoutesPelicula from './routes/pelicula.routes.js';

const app = express()

//middlewares
app.use(express.json());

//routes
useRoutesReseña(app)
useRoutesPelicula(app)


app.listen(4000)
console.log('Server running on port', 4000);