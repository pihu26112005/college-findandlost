import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
  const uri = process.env.URI!; 

  const client = new MongoClient(uri);

  try {
    const { searchParams } = new URL(req.url);
    // const searchParams = req.nextUrl.searchParams // ye nhi chalta abb
    const queryID = searchParams.get('id');

    if (!queryID) {
      return NextResponse.json({ error: 'queryID query parameter is required' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('test'); // Replace with your database queryID
    const items = database.collection('query'); // Replace with your collection queryID

    const query = { queryID: queryID };
    const result = await items.find(query).toArray();

    if (result.length === 0) {
      return NextResponse.json({ message: 'No records found' }, { status: 200 });
    }

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}