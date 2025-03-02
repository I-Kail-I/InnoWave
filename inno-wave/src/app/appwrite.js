import { Client as AppwriteClient, Account, Databases, ID } from "appwrite";

const client = new AppwriteClient();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || "");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
