import { rateLimitConfig } from '@/util/api-rate-limit.config';
import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';
import  HttpStatusCode  from '@/util/server_status_code'
import mysql from 'mysql2/promise';






const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{



  return apiLimiter(req, res,async () => {

    const API_NAME =  'SQL Connection' 

  if (req.method !== 'GET') { 
      return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
}

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.ATABASE_NAME,
  port: Number(process.env.DATABASE_PORT)
});

console.log(API_NAME)

 const body = req.body 
 
 try {
    
    const [rows] = await connection.execute('SELECT * FROM sql7789791.Products;');

    console.log(rows)

    await connection.end();

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });

}

}
)
}


export const config = {
api: {
 externalResolver: true, 
}
}