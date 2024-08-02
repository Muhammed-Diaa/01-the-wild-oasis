import { useForm, SubmitHandler } from "react-hook-form";

import FormRowComponent, { StyledRow } from "../../ui/FormRow";
import InsertDataLayout from "../../ui/InsertData";
import FileInput from "../../ui/FileInput";
import InputsFiled from "../../ui/Inputs";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import { CabinResponse, ICFN, MutationResult } from "../../types/ResponseTypes";
import { insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponses";

function CreateAndEditCabin({ setOpen, editCabins }: ICFN) {
  const { id: editID, ...editValues } = editCabins || {};
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
      const { mutate, isPending } = IUDApiResponse({
        queryKey: "cabins",
        FN: insertAndEditCabin,
        reset: reset,
        setOpen: setOpen,
        FunctionName: key,
      });
      acc[`${key}Cabins`] = { mutate, isPending };
      return acc;
    },
    {}
  );
  const { CreatingCabins, EditingCabins } = mutations;
  const isPending = EditingCabins.isPending || CreatingCabins.isPending;
  const onSubmit: SubmitHandler<CabinResponse> = async (data) => {
    const isImage = typeof data.image === "string";
    const image = isImage ? data.image : (data.image as File[])[0];
    const Data = { ...data, image: image };

    if (isEditSession) EditingCabins.mutate({ id: editID, Data });
    else CreatingCabins.mutate({ Data });
  };

  return (
    <InsertDataLayout onSubmit={handleSubmit(onSubmit)} setOpen={setOpen}>
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
      <StyledRow>
        <Button
          onClick={() => {
            reset();
            setOpen(false);
          }}
          $variation="secondary"
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </StyledRow>
    </InsertDataLayout>
  );
}

export default CreateAndEditCabin;
