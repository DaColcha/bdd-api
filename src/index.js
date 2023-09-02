import express from 'express'
import reseñaRoutes from './routes/reseña.routes.js'
import participacion_actorRoutes from './routes/participacion_actor.routes.js'
import socioRoutes from './routes/socio.routes.js'
import empleadoRoutes from './routes/empleado.routes.js'

const app = express()

//middlewares
app.use(express.json());

//routes
app.use(reseñaRoutes);

app.listen(4000)
console.log('Server running on port', 4000);