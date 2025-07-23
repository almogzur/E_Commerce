import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getProductById } from '@/util/sql/db'

const idSchema = z.string().regex(/^\d+$/)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { id } = req.query
  const parsed = idSchema.safeParse(id)

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  try {
    const product = await getProductById(parseInt(parsed.data))

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    return res.status(200).json(product)
  } 
  catch (_error ) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
