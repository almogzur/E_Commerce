
import  { Pool } from 'pg';



const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432, // default
  database: process.env.PG_DB_NAME,
 ssl: {
    rejectUnauthorized: true
  },

});

export async function getProductById(id: number) {
  try {
    const result = await pool.query(
      'SELECT * FROM public.product WHERE id = $1', 
      /* $1 is a placeholder for a value.
        It gets replaced securely with the
       first element from the array [id]
       */
      [id]
    )

    return result.rows[0] || null
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    throw error
  }
}


export default pool;