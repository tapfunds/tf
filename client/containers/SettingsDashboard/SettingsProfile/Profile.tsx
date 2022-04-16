import { SettingsFrame } from "../../../components";
import ProfileContent from "./ProfileContent";
const Profile = () => {
  function renderProfile() {
    return <ProfileContent />;
  }
  function renderSettingsFrame() {
    return <SettingsFrame pageContent={renderProfile()} />;
  }
  return <div>{renderSettingsFrame()}</div>;
};

export default Profile;
