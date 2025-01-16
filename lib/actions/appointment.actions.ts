"use server";
import { ID } from "node-appwrite";
import { apprwiteConfig, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      apprwiteConfig.databaseId,
      apprwiteConfig.appointmentCollectionId,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log("unable to create appointment", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      apprwiteConfig.databaseId,
      apprwiteConfig.appointmentCollectionId,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log("error fetching appointment details", error);
  }
};
