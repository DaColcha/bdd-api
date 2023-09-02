import express from 'express'

import useRoutesReseña from './routes/reseña.routes.js'
import useRoutesPelicula from './routes/pelicula.routes.js';
import useRoutesParticipacion_Actor from './routes/participacion_actor.routes.js';
import useRoutesSocio from './routes/socio.routes.js';
import useRoutesEmpleado from './routes/empleado.routes.js';

import reseñaRoutes from './routes/reseña.routes.js'
import participacion_actorRoutes from './routes/participacion_actor.routes.js'
import socioRoutes from './routes/socio.routes.js'
import empleadoRoutes from './routes/empleado.routes.js'


const app = express()

//middlewares
app.use(express.json());

//routes
useRoutesReseña(app)
useRoutesPelicula(app)
useRoutesParticipacion_Actor(app)
useRoutesSocio(app)
useRoutesEmpleado(app)


app.listen(4000)
console.log('Server running on port', 4000);