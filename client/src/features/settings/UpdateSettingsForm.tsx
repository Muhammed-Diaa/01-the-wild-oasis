import { useForm } from "react-hook-form";
import { getSettings, updateSetting } from "../../services/apiSettings";
import FormData from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Inputs";
import { ApiGetResponse, IUDApiResponse } from "../../utils/ApiResponses";
import { Settings } from "../../types/ResponseTypes";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const { register, handleSubmit } = useForm<Settings>();
  const { data: setting } = ApiGetResponse({
    queryKey: "settings",
    queryFn: getSettings,
  });
  const { isPending, mutate } = IUDApiResponse<Settings>({
    queryKey: "settings",
    FN: updateSetting,
    FunctionName: "Updating settings",
  });
  const onSubmit = (data: Settings) => {
    console.log(data);
    mutate(data);
  };

  if (!setting) return;
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = setting;

  return (
    <FormData onSubmit={handleSubmit(onSubmit)}>
      <FormRow name="Minimum nights/booking">
        <Input
          disabled={isPending}
          {...register("minBookingLength")}
          id="min-nights"
          type="number"
          placeholder="Min Booking Length"
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow name="Maximum nights/booking">
        <Input
          disabled={isPending}
          {...register("maxBookingLength")}
          id="max-nights"
          type="number"
          placeholder="Max Booking Length"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow name="Maximum guests/booking">
        <Input
          disabled={isPending}
          {...register("maxGuestsPerBooking")}
          id="max-guests"
          type="number"
          placeholder="Max Guests Per Booking"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow name="Breakfast price">
        <Input
          disabled={isPending}
          {...register("breakfastPrice")}
          id="breakfast-price"
          type="number"
          placeholder="Breakfast Price"
          defaultValue={breakfastPrice}
        />
      </FormRow>{" "}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </FormData>
  );
}

export default UpdateSettingsForm;
