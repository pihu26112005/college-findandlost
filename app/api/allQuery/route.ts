import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const uri = process.env.URI!;
    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db("test");
            const items = database.collection("query");
            const item = await items.find().toArray(); 
            return NextResponse.json(item);
        } finally {
            await client.close();
        }
    }
    return await run().catch((error) => {
        console.dir(error);
        return new NextResponse("An error occurred", { status: 500 });
    });
}