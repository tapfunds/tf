import { SettingsFrame } from "../../../components";

const Profile = () => {
  function renderProfile() {
    return <div>Users Profile</div>;
  }
  function renderSettingsFrame() {
    return <SettingsFrame pageContent={renderProfile()} />;
  }
  return <div>{renderSettingsFrame()}</div>;
};

export default Profile;
