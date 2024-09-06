import { Cabins } from "../types/ResponseTypes";
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

const URL = import.meta.env.VITE_SUPABASE_URL;

export const getCabins = async ({
  page,
  filter,
  sortBy,
}: {
  page?: number;
  filter?: { field: string; value: string };
  sortBy?: { field: string; diraction: string };
}) => {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  if (filter && filter !== null) {
    if (filter.value === "with-discount") {
      query = query.or("discount.gt.0");
    }
    if (filter.value === "no-discount") {
      query = query.or("discount.eq.0");
    }
  }

  if (sortBy && sortBy !== null)
    query = query.order(sortBy.field, {
      ascending: sortBy.diraction === "asc",
    });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("Cabins could not be loaded");
  return { data, count };
};
export const insertAndEditCabin = async ({ id, Data }: Cabins) => {
  const isImageString = typeof Data.image === "string";
  const uniqueIdentifier = `${Math.random()}-${Date.now()}`;
  const imageName = `${uniqueIdentifier}-${
    (Data.image as unknown as File).name
  }`.replace(/\//g, "");

  const imagePath = isImageString
    ? (Data.image as string)
    : `${URL}/storage/v1/object/public/cabins-Images/${imageName}`;

  let query;

  if (!id) {
    query = supabase.from("cabins").insert([{ ...Data, image: imagePath }]);
  } else {
    query = supabase
      .from("cabins")
      .update({ ...Data, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

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
