import express from 'express'
import cors from 'cors'

import useRoutesReseña from './routes/reseña.routes.js'
import useRoutesPelicula from './routes/pelicula.routes.js';
import useRoutesAgencia from './routes/agencia.routes.js';
import useRoutesAlquiler from './routes/alquiler.routes.js';
import useRoutesDirector from './routes/director.routes.js';
import useRoutesParticipacion_Actor from './routes/participacion_actor.routes.js';
import useRoutesActor from './routes/actor.routes.js';
import useRoutesSocio from './routes/socio.routes.js';
import useRoutesEmpleado from './routes/empleado.routes.js';
import useRoutesEjemplar_info from './routes/ejemplar_info.routes.js';

const app = express()

//middlewares
app.use(express.json());
app.use(cors());

//routes
useRoutesReseña(app)
useRoutesPelicula(app)
useRoutesAgencia(app)
useRoutesAlquiler(app)
useRoutesDirector(app)
useRoutesParticipacion_Actor(app)
useRoutesActor(app)
useRoutesSocio(app)
useRoutesEmpleado(app)
useRoutesEjemplar_info(app)

app.listen(4000)
console.log('Server running on port', 4000);