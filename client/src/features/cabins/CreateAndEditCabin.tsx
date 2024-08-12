import { useForm, SubmitHandler } from "react-hook-form";

import styled from "styled-components";

import FormRowComponent, { StyledRow } from "../../ui/FormRow";

import FileInput from "../../ui/FileInput";
import InputsFiled from "../../ui/Inputs";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Meta from "../../utils/Meta";

import { CabinResponse, ICFN, MutationResult } from "../../types/ResponseTypes";
import { insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

const FormData = styled(Form)`
  background-color: var(--color-grey-0);
  max-width: 120rem;
  padding: 4rem;
  border-radius: var(--border-radius-sm);
`;

function CreateAndEditCabin({ editCabins, onCloseModal }: ICFN) {
  const { id: editID, ...editValues } = editCabins ?? {};
  const [price, setprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const TotalPrice = price - discount;
  console.log(TotalPrice);
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
        onCloseModal,
      });
      acc[key] = { mutate, isPending, status };
      return acc;
    },
    {}
  );
  const { Creating, Editing } = mutations;
  const isPending = Editing.isPending || Creating.isPending;

  const onSubmit: SubmitHandler<CabinResponse> = async (data) => {
    const isImage = typeof data.image === "string";
    const image = isImage ? data.image : (data.image as File[])[0];
    const Data = { ...data, image };

    if (isEditSession) Editing.mutate({ id: editID, Data });
    else Creating.mutate({ Data });
  };
  return (
    <Meta title={isEditSession ? "Edit Cabin" : "Add New Cabin"}>
      <FormData onSubmit={handleSubmit(onSubmit)}>
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
              onChange: (e) => setprice(e.target.value),
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
              onChange: (e) => setDiscount(e.target.value),
              validate: (value) =>
                value <= +getValues("regularPrice") ||
                "Discount must be less than price",
            })}
          />
        </FormRowComponent>{" "}
        <FormRowComponent error={errors.discount?.message} name={"Total Price"}>
          <InputsFiled
            disabled={true}
            value={TotalPrice < 1 ? 0 : TotalPrice}
            type="number"
          />
        </FormRowComponent>{" "}
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
            type="button"
            onClick={() => {
              onCloseModal?.();
            }}
            $variation="secondary"
          >
            Cancel
          </Button>
          <Button $variation={"primary"} disabled={isPending}>
            {isEditSession ? "Edit Cabin" : "Create New Cabin"}
          </Button>
        </StyledRow>
      </FormData>
    </Meta>
  );
}

export default CreateAndEditCabin;
