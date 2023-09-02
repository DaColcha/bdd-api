import express from 'express'

import useRoutesReseña from './routes/reseña.routes.js'
import useRoutesPelicula from './routes/pelicula.routes.js';
import useRoutesAgencia from './routes/agencia.routes.js';
import useRoutesParticipacion_Actor from './routes/participacion_actor.routes.js';
import useRoutesSocio from './routes/socio.routes.js';
import useRoutesEmpleado from './routes/empleado.routes.js';

const app = express()

//middlewares
app.use(express.json());

//routes
useRoutesReseña(app)
useRoutesPelicula(app)
useRoutesAgencia(app)
useRoutesParticipacion_Actor(app)
useRoutesSocio(app)
useRoutesEmpleado(app)


app.listen(4000)
console.log('Server running on port', 4000);