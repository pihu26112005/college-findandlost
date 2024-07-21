import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
  const uri = process.env.URI!; 

  const client = new MongoClient(uri);

  try {
    const { searchParams } = new URL(req.url);
    // const searchParams = req.nextUrl.searchParams
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Name query parameter is required' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('test'); // Replace with your database name
    const items = database.collection('query'); // Replace with your collection name

    const query = { name: name };
    const result = await items.find(query).toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}