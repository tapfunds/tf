import type { NextPage } from "next";
import ProfileContent from "./components/ProfileContent";
import SettingsFrame from "./components/SettingsFrame";

const ProfilePage: NextPage = () => {
  return <SettingsFrame pageContent={<ProfileContent />} />;
};

export default ProfilePage;
