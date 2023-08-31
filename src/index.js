import express from 'express'
import reseñaRoutes from './routes/reseña.routes.js'

const app = express()

//middlewares
app.use(express.json());

//routes
app.use(reseñaRoutes);

app.listen(4000)
console.log('Server running on port', 4000);