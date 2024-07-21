import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.URI!;
const client = new MongoClient(uri);


export async function POST(req: Request) {
    const { queryID } = await req.json(); // Destructure queryID from the request body

    if (!queryID) {
      return NextResponse.json({ error: 'queryID is required' }, { status: 400 });
    }

    try {
      await client.connect();
      const database = client.db("test");
      const collection = database.collection("query");

      const result = await collection.deleteOne({ queryID:queryID});

      if (result.deletedCount === 1) {
        return NextResponse.json({ message: 'Query deleted successfully' });
      } else {
        return NextResponse.json({ error: 'Query not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting query:', error);
        return NextResponse.json({ error: 'An error occurred while deleting the query' }, { status: 500 });
    } finally {
      await client.close();
    }
}
