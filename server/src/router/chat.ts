import {Router,Request,Response} from 'express';

export const router = Router();

router.get('/',(_req:Request,res:Response)=>{
    res.send('Server is running')
});

router.post('/create',(_req:Request,_res:Response)=>{
   try {
       
   } catch (error) {
       
   }
});

