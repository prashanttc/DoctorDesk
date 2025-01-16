"use server";
import { ID, Query } from "node-appwrite";
import { apprwiteConfig, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/actions";

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

export const recentAppointments = async()=>{
  try{
  const appointment = await databases.listDocuments(
    apprwiteConfig.databaseId,
    apprwiteConfig.appointmentCollectionId,
    [Query.orderDesc('$createdAt')]
  )
const initialCount = {
  scheduledCount:0,
  pendingCount:0,
  cancelledCount:0,
}
 const count = (appointment.documents as Appointment[]).reduce((acc,appointment)=>{
  if(appointment.status ==="scheduled"){
    acc.scheduledCount += 1;
  }else if(appointment.status === 'pending'){
    acc.pendingCount += 1;
  }else if(appointment.status === 'cancelled'){
    acc.cancelledCount += 1;
  }
  return acc;
 },initialCount)

const data = {
  totalCount: appointment.total,
  ...count,
  document:appointment.documents
}

return parseStringify(data);

  }catch(error){
    console.log("failed to fetch recent appointments",error)
  }
}
