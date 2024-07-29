import { CabinResponse, Cabins } from "../types/ResponseTypes";
import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error with loading Cabins");
  }
  return data;
};
export const insertCabin = async ({ Data }: { Data: CabinResponse }) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: Data.name,
        maxCapcity: Data.maxCapcity,
        regularPrine: Data.regularPrine,
        discount: Data.discount,
        description: Data.description,
        image: Data.image,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Error with insert Cabins");
  }
  return data;
};
export const editCabin = async ({ id, Data }: Cabins) => {
  const { data, error } = await supabase
    .from("cabins")
    .update(Data)
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Error with insert Cabins");
  }
  return data;
};
export const deleteCabin = async ({ Data }: { Data: CabinResponse }) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: Data.name,
        maxCapcity: Data.maxCapcity,
        regularPrine: Data.regularPrine,
        discount: Data.discount,
        description: Data.description,
        image: Data.image,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Error with insert Cabins");
  }
  return data;
};
