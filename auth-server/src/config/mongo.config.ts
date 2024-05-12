import {MongoClient} from "mongodb";

export class MongoClientConnector{
    private static _instance: MongoClientConnector;

    public clientPromise: Promise<MongoClient>;

    private constructor() {

        if (!process.env.MONGODB_URI) {
            throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
        }

        const uri = process.env.MONGODB_URI;
        const options = {};

        let client;

        if (process.env.NODE_ENV === "development") {
            // In development mode, use a global variable so that the value
            // is preserved across module reloads caused by HMR (Hot Module Replacement).
            let globalWithMongo = global as typeof globalThis & {
                _mongoClientPromise?: Promise<MongoClient>;
            };

            if (!globalWithMongo._mongoClientPromise) {
                client = new MongoClient(uri, options);
                globalWithMongo._mongoClientPromise = client.connect();
            }
            this.clientPromise = globalWithMongo._mongoClientPromise;
        } else {
            // In production mode, it's best to not use a global variable.
            client = new MongoClient(uri, options);
            this.clientPromise = client.connect();
        }

    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}
