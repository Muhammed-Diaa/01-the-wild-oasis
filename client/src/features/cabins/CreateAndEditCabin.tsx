import { useForm, SubmitHandler } from "react-hook-form";

import FormRowComponent from "../../ui/FormRow";

import FileInput from "../../ui/FileInput";
import InputsFiled from "../../ui/Inputs";
import Textarea from "../../ui/Textarea";

import { CabinResponse, ICFN, MutationResult } from "../../types/ResponseTypes";
import { insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponses";
import Toggles from "../../context/toggle";
import { BiEdit } from "react-icons/bi";
import Meta from "../../utils/Meta";

function CreateAndEditCabin({ editCabins }: ICFN) {
  const { id: editID, ...editValues } = editCabins ?? {};
  const isEditSession = Boolean(editID);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinResponse>({
    defaultValues: isEditSession
      ? { ...editValues, image: editCabins?.image }
      : {},
  });

  const mutationConfigs = [{ key: "Creating" }, { key: "Editing" }];
  const mutations = mutationConfigs.reduce<Record<string, MutationResult>>(
    (acc, config) => {
      const { key } = config;
      const { mutate, isPending, status } = IUDApiResponse({
        queryKey: "cabins",
        FN: insertAndEditCabin,
        reset: reset,
        FunctionName: key,
      });
      acc[key] = { mutate, isPending, status };
      return acc;
    },
    {}
  );
  const { Creating, Editing } = mutations;
  const isPending = Editing.isPending || Creating.isPending;
  const status = Creating.status === "idle" ? Editing.status : Creating.status;
  const state = status === "success" && Object.keys(errors).length === 0;
  const onSubmit: SubmitHandler<CabinResponse> = async (data) => {
    const isImage = typeof data.image === "string";
    const image = isImage ? data.image : (data.image as File[])[0];
    const Data = { ...data, image: image };

    if (isEditSession) Editing.mutate({ id: editID, Data });
    else Creating.mutate({ Data });
  };
  // console.log("state", state);
  return (
    <Meta title={isEditSession ? "Edit Cabin" : "Add New Cabin"}>
      <Toggles>
        <Toggles.Btn $variation={isEditSession ? "toggle" : "primary"}>
          <span>{isEditSession ? "Edit" : "Add Cabin"}</span>
          {isEditSession && <BiEdit />}
        </Toggles.Btn>
        <Toggles.Menu status={state} onSubmit={handleSubmit(onSubmit)}>
          <FormRowComponent error={errors.name?.message} name={"Cabin Name"}>
            <InputsFiled
              disabled={isPending}
              id={"name"}
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </FormRowComponent>
          <FormRowComponent
            error={errors.maxCapacity?.message}
            name={"Maximum Capacity"}
          >
            <InputsFiled
              disabled={isPending}
              id={"maxCapacity"}
              type="number"
              {...register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity must be at least 1",
                },
              })}
            />
          </FormRowComponent>
          <FormRowComponent
            error={errors.regularPrice?.message}
            name={"Regular Price"}
          >
            <InputsFiled
              disabled={isPending}
              id={"price"}
              type="number"
              {...register("regularPrice", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Price must be at least 1",
                },
              })}
            />
          </FormRowComponent>
          <FormRowComponent error={errors.discount?.message} name={"Discount"}>
            <InputsFiled
              disabled={isPending}
              id={"discount"}
              type="number"
              {...register("discount", {
                required: "This field is required",
                validate: (value) =>
                  value <= +getValues("regularPrice") ||
                  "Discount must be less than price",
              })}
            />
          </FormRowComponent>
          <FormRowComponent
            error={errors.description?.message}
            name={"Description"}
          >
            <Textarea
              id={"description"}
              disabled={isPending}
              {...register("description", {
                required: isEditSession ? false : "This field is required",
              })}
            />
          </FormRowComponent>
          <FormRowComponent error={errors.image?.message} name={"Cabin photo"}>
            <FileInput
              disabled={isPending}
              id={"image"}
              accept="image/*"
              {...register("image", {
                required: isEditSession ? false : "This field is required",
              })}
            />
          </FormRowComponent>
          <Toggles.Buttons status={state} isPending={isPending}>
            Add Cabin
          </Toggles.Buttons>
        </Toggles.Menu>
      </Toggles>
    </Meta>
  );
}

export default CreateAndEditCabin;

// <TapLayoutOverAll
//   error={errors}
//   status={status}
//   isPending={isPending}
//   onSubmit={handleSubmit(onSubmit)}
//   buttonName={isEditSession ? "Edit" : "Create Cabin"}
//   confirmButton={"Add Cabin"}
// >
//   <FormRowComponent error={errors.name?.message} name={"Cabin Name"}>
//     <InputsFiled
//       disabled={isPending}
//       id={"name"}
//       type="text"
//       {...register("name", {
//         required: "This field is required",
//       })}
//     />
//   </FormRowComponent>
//   <FormRowComponent
//     error={errors.maxCapacity?.message}
//     name={"Maximum Capacity"}
//   >
//     <InputsFiled
//       disabled={isPending}
//       id={"maxCapacity"}
//       type="number"
//       {...register("maxCapacity", {
//         required: "This field is required",
//         min: {
//           value: 1,
//           message: "Capacity must be at least 1",
//         },
//       })}
//     />
//   </FormRowComponent>
//   <FormRowComponent
//     error={errors.regularPrice?.message}
//     name={"Regular Price"}
//   >
//     <InputsFiled
//       disabled={isPending}
//       id={"price"}
//       type="number"
//       {...register("regularPrice", {
//         required: "This field is required",
//         min: {
//           value: 1,
//           message: "Price must be at least 1",
//         },
//       })}
//     />
//   </FormRowComponent>
//   <FormRowComponent error={errors.discount?.message} name={"Discount"}>
//     <InputsFiled
//       disabled={isPending}
//       id={"discount"}
//       type="number"
//       {...register("discount", {
//         required: "This field is required",
//         validate: (value) =>
//           value <= +getValues("regularPrice") ||
//           "Discount must be less than price",
//       })}
//     />
//   </FormRowComponent>
//   <FormRowComponent
//     error={errors.description?.message}
//     name={"Description"}
//   >
//     <Textarea
//       id={"description"}
//       disabled={isPending}
//       {...register("description", {
//         required: isEditSession ? false : "This field is required",
//       })}
//     />
//   </FormRowComponent>
//   <FormRowComponent error={errors.image?.message} name={"Cabin photo"}>
//     <FileInput
//       disabled={isPending}
//       id={"image"}
//       accept="image/*"
//       {...register("image", {
//         required: isEditSession ? false : "This field is required",
//       })}
//     />
//   </FormRowComponent>
// </TapLayoutOverAll>
