import { useForm } from "react-hook-form";
import { getSettings } from "../../services/apiSettings";

import FormData from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Inputs";
import { ApiGetResponse } from "../../utils/ApiResponses";

function UpdateSettingsForm() {
  const { register } = useForm();
  console.log("Register", register);
  const { data: setting } = ApiGetResponse({
    queryKey: "settings",
    queryFn: getSettings,
  });

  if (!setting) return;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = setting;

  console.log(setting);
  return (
    <FormData>
      <FormRow name="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register}
        />
      </FormRow>
      <FormRow name="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register}
        />
      </FormRow>
      <FormRow name="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          {...register}
        />
      </FormRow>
      <FormRow name="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          {...register}
        />
      </FormRow>
    </FormData>
  );
}

export default UpdateSettingsForm;
