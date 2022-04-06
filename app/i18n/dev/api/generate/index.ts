import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { run } = await import('./run')
    await run()
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
}

export default handler
