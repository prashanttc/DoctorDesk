import * as sdk from "node-appwrite";

export const apprwiteConfig={
  endpoint:process.env.NEXT_PUBLIC_ENDPOINT!,
  projectId:process.env.PROJECT_ID!,
  databaseId:process.env.DATABASE_ID!,
  patientCollectionId:process.env.PATIENT_COLLECTION_ID!,
  doctorCollectionId:process.env.DOCTOR_COLLECTION_ID!,
  appointmentCollectionId:process.env.APPOINTMENT_COLLECTION_ID!,
  bucketId:process.env.NEXT_PUBLIC_BUCKET_ID!,
}



const client = new sdk.Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
