import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoClient, ServerApiVersion } from 'mongodb';
var ip = require('ip');

async function bootstrap() {
  console.dir(ip.address());
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server started on port ${port}!`));

  const uri = "mongodb+srv://solo:reqwow88@talk-hub-cluster.pw9tlim.mongodb.net/?retryWrites=true&w=majority&appName=talk-hub-cluster";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    // Отримуємо доступ до колекції "users" у базі даних
    const db = client.db("talk-hub-DB"); // Замініть "your_database_name" на назву вашої бази даних
    const usersCollection = db.collection("user");

    // Створюємо одного користувача у колекції "users"
    const newUser = { name: "John Doe", email: "john@example.com" };
    const insertResult = await usersCollection.insertOne(newUser);
    console.log("Inserted new user:", insertResult.insertedId);

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

bootstrap();
