import { Cabins } from "../types/ResponseTypes";
import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");

  return data;
};
const URL = import.meta.env.VITE_SUPABASE_URL;

export const insertAndEditCabin = async ({ id, Data }: Cabins) => {
  const isImageString = typeof Data.image === "string";
  const uniqueIdentifier = `${Math.random()}-${Date.now()}`;
  const imageName = `${uniqueIdentifier}-${
    (Data.image as unknown as File).name
  }`.replace(/\//g, "");

  const imagePath = isImageString
    ? (Data.image as string)
    : `${URL}/storage/v1/object/public/cabins-Images/${imageName}`;

  console.log(Data);
  let query;

  if (!id) {
    query = supabase.from("cabins").insert([{ ...Data, image: imagePath }]);
  } else {
    query = supabase
      .from("cabins")
      .update({ ...Data, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) throw new Error(`${id ? "inserting" : "updating"} failed`);
  if (Data.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("cabins-Images")
      .upload(imageName, Data.image);

    if (storageError && data && data[0]) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
    }
  }
  return data;
};
export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
  return error;
};
