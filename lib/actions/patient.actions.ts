/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Unexpected error during user creation:", error);
    if (error?.code === 409) {
      console.warn("User already exists. Fetching existing user...");
      const document = await users.list([Query.equal("email", [user.email])]);
      if (document?.users?.length) {
        return document.users[0];
      }
      console.error("Conflict error, but no user found with the given email.");
    }
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
