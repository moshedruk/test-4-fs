import exp,{Router,Request,Response} from 'express'
import beeperService from '../services/beeperService'



const router:Router = exp.Router()

router.get('/', async (req:Request,res:Response):Promise<void> =>{
    try{
        const result = await beeperService.getAllBeepers()
        res.json({
            err: false,
            message: 'Login Successful',  
            data:result 
        })
    }
    catch(arr){
        res.status(404).json({
            err: true,
            message: 'Invalid',
            data: null
        })
    } 
})
router.post('/', async (req:Request,res:Response):Promise<void> =>{
    try{
        const result =  await beeperService.createNewBeeper(req.body)
        if(result){
        res.status(201).json({
            err: false,
            message: 'Login Successful',  
            data:result 
        })}
        else{
            throw new Error("cant save user")
        }
    }
    catch(err){
        res.status(404).json({
            err: true,
            message: err|| 'Invalid',
            data: null
        })
    } 
})
router.delete('/:id', async (req:Request,res:Response):Promise<void> =>{
    try{
        const result =  await beeperService.createNewBeeper(req.body)
        if(result){
        res.status(201).json({
            err: false,
            message: 'Login Successful',  
            data:result 
        })}
        else{
            throw new Error("cant save user")
        }
    }
    catch(err){
        res.status(404).json({
            err: true,
            message: err|| 'Invalid',
            data: null
        })
    } 
})
router.get('/:id', async (req:Request,res:Response):Promise<void> =>{
    try{
        const result =  await beeperService.getBeeperById(req.params.id)
        res.json({
            err: false,
            message: 'Login Successful',  
            data:result 
        })
    }
    catch(arr){
        res.status(404).json({
            err: true,
            message: 'Invalid',
            data: null
        })
    } 
})
export default router