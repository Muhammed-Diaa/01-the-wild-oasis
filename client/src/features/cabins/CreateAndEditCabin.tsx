import { useForm, SubmitHandler } from "react-hook-form";

import FormRowComponent, { StyledRow } from "../../ui/FormRow";
import InsertDataLayout from "../../ui/InsertData";
import FileInput from "../../ui/FileInput";
import InputsFiled from "../../ui/Inputs";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import { CabinResponse, ICFN } from "../../types/ResponseTypes";
import { insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponse";

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
      ? { ...editValues, image: editCabins?.image as string }
      : {},
  });

  const { mutate: CreateCabin, isPending: isCreating } = IUDApiResponse({
    queryKey: "cabins",
    FN: insertAndEditCabin,
    loading: "inserting...",
    success: "inserted successfully",
    error: "inserting failed",
    reset: reset,
    setOpen: setOpen,
  });
  const { mutate: EditingCabin, isPending: isEditing } = IUDApiResponse({
    queryKey: "cabins",
    FN: insertAndEditCabin,
    loading: "editing...",
    success: "editing successfully",
    error: "editing failed",
    reset: reset,
    setOpen: setOpen,
  });

  const onSubmit: SubmitHandler<CabinResponse> = async (data) => {
    const Data = {
      ...data,
      image:
        typeof data.image === "string"
          ? data.image
          : Array.isArray(data.image)
          ? data.image[0]
          : data.image,
    };
    if (isEditSession) {
      EditingCabin({
        id: editID,
        Data,
      });
    } else {
      CreateCabin({
        Data,
      });
    }
  };

  const isPending = isCreating || isEditing;
  const onError = (error: object) => {
    console.log(error);
  };

  return (
    <InsertDataLayout
      onSubmit={handleSubmit(onSubmit, onError)}
      setOpen={setOpen}
    >
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
