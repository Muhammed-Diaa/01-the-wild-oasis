import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Meta from "../utils/Meta";

function Settings() {
  return (
    <Meta title="Settings">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Meta>
  );
}

export default Settings;
