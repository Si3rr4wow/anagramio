import { Collection, MongoClient } from "mongodb";

const dbName = "db";
const collectionNames = {
  words: "words",
};

export class Client {
  async init() {
    if (this.client) {
      console.log("Mongo client already exists");
      return;
    }
    // Not bothering with a try catch here, at this stage of dev I'd rather just see the raw error
    this.client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );

    const db = this.client.db(dbName);
    this.collections = Object.entries(collectionNames).reduce<
      Record<string, Collection>
    >((acc, [key, value]) => {
      return {
        ...acc,
        [key]: db.collection(value),
      };
    }, {});
  }

  private client: MongoClient | undefined;
  private collections: Record<string, Collection> | undefined;

  getClient = () => {
    if (!this.client) throw new Error("Mongo client not yet instantiated");
    return this.client;
  };

  getCollections = () => {
    if (!this.collections)
      throw new Error("Mongo collections not yet instantiated");
    return this.collections;
  };
}

let client: Client | undefined;
export const getDbClient = async () => {
  if (client) return client;
  client = new Client();
  await client.init();
  return client;
};
