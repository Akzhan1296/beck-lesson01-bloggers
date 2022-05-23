// const { MongoClient, ServerApiVersion } = require('mongodb');


// const uri = "mongodb+srv://Akzhan:!qwerty123$@test.acpyg.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// export const postsCollection = client.db('dataBase').collection('posts');
// export const bloggersCollection = client.db('dataBase').collection('bloggers');


// export async function runDb() {
//   client.connect(async (err: any) => {
//     try {
//       // Connect the client to the server
//       await client.connect();
//       console.log("Connected successfully to mongo server");

//     } catch {
//       console.log(err)
//       console.log("Can't connect to db");
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   });
// }


import {MongoClient} from 'mongodb'
import { PostItem } from './posts-db-repository';
import { BloggerItem } from './bloggers-db-repository';

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

export const postsCollection = client.db('dataBase').collection<PostItem>('posts');
export const bloggersCollection = client.db('dataBase').collection<BloggerItem>('bloggers');

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        console.log("Connected successfully to mongo server");

    } catch {
        console.log("Can't connect to db");
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
