import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_HfvzZVPZEXW3ynGrWXehkGFoe741cqPVWZ8m0TQn9gi'
});

const databaseId = '14fd0db2c2704181b71cd8d831f3c1cb'

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId},
      properties: {
        title: [
          {
            text: {
              content: name,
            }
          }
        ]
      }
    })
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {name} = req.query;

  if(name == null) {
    return res.status(400).json({message: 'No name'});
  }

  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name}` })
  } catch (error) {
    res.status(400).json({message: 'Fail add'});
  }

}
