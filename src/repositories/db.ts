import { settings } from '../settings';

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(settings.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const postsCollection = client.db('dataBase2').collection('posts');
export const bloggersCollection = client.db('dataBase2').collection('bloggers');
export const usersCollection = client.db('dataBase2').collection('users');
export const commentsCollection = client.db('dataBase2').collection('comments');

export async function runDb() {
  client.connect(async (err: any) => {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to mongo server");

    } catch {
      console.log(err)
      console.log("Can't connect to db");
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  });
}
