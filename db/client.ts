// db/client.ts
import { MongoClient, Collection } from "mongodb";

const dbName = "db";
const collectionNames = {
  words: "words",
};

export class Client {
  private client: MongoClient | null = null;
  private collections: Record<string, Collection> | null = null;

  async init() {
    if (this.client) return;
    this.client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );
    const db = this.client.db(dbName);
    this.collections = Object.entries(collectionNames).reduce<
      Record<string, Collection>
    >((acc, [key, value]) => ({ ...acc, [key]: db.collection(value) }), {});
  }

  async teardown() {
    if (!this.client) return;
    await this.client.close(true);
    this.client = null;
    this.collections = null;
  }

  getCollections() {
    if (!this.collections)
      throw new Error("Mongo collections not yet instantiated");
    return this.collections;
  }
}

const clientInstance = new Client();

export const getDbClient = async () => {
  await clientInstance.init();
  return clientInstance;
};

export const teardownDb = async () => {
  await clientInstance.teardown();
};
