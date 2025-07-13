import { rateLimitConfig } from '@/util/api-rate-limit.config';
import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import  HttpStatusCode  from '@/util/server_status_code';

import  { Pool } from 'pg';



const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432, // default
  database: process.env.PG_DB_NAME,
  ssl: { rejectUnauthorized: false } // matches ?sslmode=require
});



const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Postgres Connection' 

  if (req.method !== 'GET') { 
      return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
}

if(!pool){
        return res.status(500).json({massage:'No DB Connection'})
}  
console.log(API_NAME)

  const sqlData  = await pool.connect()

  const sql_res = await pool.query('SELECT * FROM tour_orders LIMIT 10')

  sqlData.release()

 
  console.log(sql_res)
  
  return res.status(200).json(sql_res)

})
}


export const config = {
api: {
 externalResolver: true, 
}
}