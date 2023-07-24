import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_HfvzZVPZEXW3ynGrWXehkGFoe741cqPVWZ8m0TQn9gi'
});

const databaseId = '14fd0db2c2704181b71cd8d831f3c1cb'

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        }
      ]
    })
    console.log(response);
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: `Success` })
  } catch (error) {
    res.status(400).json({message: 'Failed'});
  }

}
