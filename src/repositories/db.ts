const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Akzhan:777Akzhan$@test.acpyg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const postsCollection = client.db('dataBase').collection('posts');
export const bloggersCollection = client.db('dataBase').collection('bloggers');


export async function runDb() {
    client.connect(async (err: any) => {
        try {
            // Connect the client to the server
            await client.connect();
            // Establish and verify connection
            await client.db("shop").command({ ping: 1 });
            console.log("Connected successfully to mongo server");

        } catch {
            console.log("Can't connect to db");
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    });


}
