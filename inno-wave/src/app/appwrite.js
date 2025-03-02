
import { Client as AppwriteClient, Account } from "appwrite";

export const client = new AppwriteClient();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || "");

  export const account = new Account (client);

  export {ID} from "appwrite"
