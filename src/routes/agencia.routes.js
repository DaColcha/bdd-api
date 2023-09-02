import Router from 'express'
import {getAgencia, createAgencia , updateAgencia, deleteAgencia } from '../controllers/agencia.controller.js'

const router = Router()

const useRoutesAgencia = (app)=> {
    app.use('/glob-guster', router)

    router.get('/agencia', getAgencia)
    router.post('/agencia', createAgencia)
    router.put('/agencia/:cod_agencia', updateAgencia)
    router.delete('/agencia/:cod_agencia', deleteAgencia)
}


export default useRoutesAgencia