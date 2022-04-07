import type { NextApiRequest } from 'next'
import type { NextApiResponseDev } from 'app/types/next'

const handler = async (req: NextApiRequest, res: NextApiResponseDev) => {
  try {
    const { run } = await import('./run')
    await run()
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(401).end()
  }
}

export default handler
