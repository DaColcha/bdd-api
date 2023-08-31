import express from 'express'
import empsRoutes from './routes/emps.routes.js'

const app = express()

//middlewares
app.use(express.json());

//routes
app.use(empsRoutes);

app.listen(4000)
console.log('Server running on port', 4000);