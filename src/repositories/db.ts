const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://Akzhan:!qwerty123@test.acpyg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const postsCollection = client.db('dataBase').collection('posts');
export const bloggersCollection = client.db('dataBase').collection('bloggers');


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
