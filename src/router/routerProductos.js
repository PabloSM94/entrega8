import {Router} from 'express'
import { verProductos } from '../contenedores/contenedorProductosFaker.js'

const router = Router()

router.get('/', (req,res)=>{
    console.log("llego peticion")
    async function cargarProductos(){
        const productos = await verProductos()
        res.json(JSON.stringify(productos))
    }
    cargarProductos()
    
})

export default router