/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";
import { apprwiteConfig, databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const userList = await users.list(); 
    const existinguser = userList.users.find((u) => u.email === user.email);
    if (!existinguser) {
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
      return parseStringify(newUser);
    }
    return console.log("user already exists")
  } catch (error: any) {
    console.error("Unexpected error during user creation:", error);
    throw new Error("Failed to create or fetch user.");
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("error fetching user details", error);
  }
};

export const loginUser = async (email: string) => {
  try {
    const user = await databases.listDocuments(
      apprwiteConfig.databaseId,
      apprwiteConfig.patientCollectionId,
      [Query.equal("email", [email])]
    );
    if (user.documents.length < 0) {
      return console.log("no user exist");
    }
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log("error while login", error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    const inputFile = InputFile.fromBuffer(
      identificationDocument?.get("blobfile") as Blob,
      identificationDocument?.get("fileName") as string
    );
    const file = await storage.createFile(
      apprwiteConfig.bucketId,
      ID.unique(),
      inputFile
    );
    const newPatient = await databases.createDocument(
      apprwiteConfig.databaseId,
      apprwiteConfig.patientCollectionId,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${apprwiteConfig.endpoint}/storage/buckets/${apprwiteConfig.bucketId}/files/${file.$id}/view?project=${apprwiteConfig.projectId}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      apprwiteConfig.databaseId,
      apprwiteConfig.patientCollectionId,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log("error fetching patient", error);
  }
};
