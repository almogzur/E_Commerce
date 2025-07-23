import { rateLimitConfig } from '@/util/api-rate-limit.config';
import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import  HttpStatusCode  from '@/util/server_status_code';
import  pool  from '@/util/sql/db';

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
   
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Postgres Connection' 
    console.log(API_NAME)

if(req.method !== 'GET') { 
    return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
}
if(!pool){
      return res.status(500).json({massage:'No DB Connection'})
}  

  const db  = await pool.connect()

  if(!db){
    return res.status(500).json({massage:'Error DB Connection'})
  }

  const query = await db.query('SELECT * FROM public.product');

  db.release()

  if(!query){
    return res.status(500).json({massage:'No results'})
  }
   
  return res.status(200).json(query.rows)

})
}


export const config = {
api: {
 externalResolver: true, 
}
}