import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json();

    const uri = process.env.URI!;
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);
    
    async function run() {
        try {
            const database = client.db("test");
            const items = database.collection("query");
            const item = await items.insertOne(body);
            return NextResponse.json(item);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }

    return await run().catch((error) => {
        console.dir(error);
        // Return an error response or a default response if run fails
        return new NextResponse("An error occurred", { status: 500 });
    });
}

export async function GET(request: Request) {
    const uri = process.env.URI!;
    const client = new MongoClient(uri);
    async function run() {
        try {
            await client.connect();
            const database = client.db("test");
            const items = database.collection("query");
            const query = { type: "FindQuery" };
            const item = await items.find(query).toArray();
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