"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type Itinerary = {
  created_at: string;
  date: string;
  id: string;
  travel_id: string | null;
  updated_at: string | null;
};

export type Itineraries = Itinerary[] | null;

export const addItinerary = async (travelId: string, date: Date) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const { error, data } = await supabase
    .from("itineraries")
    .insert({ travel_id: travelId, date: date.toISOString() })
    .select();
  if (error) {
    console.error("Error adding itinerary:", error);
  }
  return data;
};

export const deleteItinerary = async (itineraryId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const { error, status } = await supabase
    .from("itineraries")
    .delete()
    .eq("id", itineraryId);
  if (error) {
    console.error("Error deleting itinerary:", error);
  }
  return status;
};

export const getItineraries = async (travelId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const { data, error } = await supabase
    .from("itineraries")
    .select("*")
    .eq("travel_id", travelId)
    .order("date", { ascending: true });
  if (error) {
    console.error("Error fetching itineraries:", error);
  }
  return data;
};
