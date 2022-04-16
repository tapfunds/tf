import { SettingsFrame } from "../../../components";

const Integrations = () => {
  function renderIntegrations() {
    return <div>Users Integrations</div>;
  }
  function renderSettingsFrame() {
    return <SettingsFrame pageContent={renderIntegrations()} />;
  }
  return <div>{renderSettingsFrame()}</div>;
};

export default Integrations;
