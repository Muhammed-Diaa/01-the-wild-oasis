import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

import { Form, FormRow, ImageForm, Input, Label } from "../../ui/UserInput";
import { useGetUser, useUpdateUser } from "../../services/apiAuth";
import { IUDApiResponse } from "../../utils/ApiResponses";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useGetUser();
  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullName;
  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatar, setAvatar] = useState<File | string>("");
  const { mutate: updateUser, isPending } = IUDApiResponse({
    queryKey: ["user"],
    FN: useUpdateUser,
    FunctionName: "Updating User",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar("");
          e.currentTarget.reset();
        },
      }
    );
  }

  const handleCancel = () => {
    setAvatar("");
    setFullName(currentFullName || "");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Input placeholder=" " id="Email" value={email || ""} disabled />
        <Label htmlFor="Email">Email</Label>
      </FormRow>
      <FormRow>
        <Input
          placeholder=" "
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isPending}
        />
        <Label htmlFor="fullName">Username</Label>
      </FormRow>

      {/* <ImageUploadCropper setAvatar={setAvatar} /> */}
      <ImageForm>
        <label>Avatar</label>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            e.target.files && setAvatar((e.target.files[0] as File) || "");
          }}
        />
      </ImageForm>
      <ButtonContainer>
        <Button type="reset" onClick={handleCancel} $variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </ButtonContainer>
    </Form>
  );
}
export default UpdateUserDataForm;
