import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_HfvzZVPZEXW3ynGrWXehkGFoe741cqPVWZ8m0TQn9gi'
});

const databaseId = '14fd0db2c2704181b71cd8d831f3c1cb'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response);
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  detail?: any
  message: string,

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const {pageId, propertyId} = req.query;
    const response = await getDetail(String(pageId), String(propertyId));
    res.status(200).json({ detail: response, message: `Success` })
  } catch (error) {
    res.status(400).json({message: 'Failed'});
  }

}
