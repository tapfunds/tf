import { SettingsFrame } from "../../../components";

const Statements = () => {
  function renderStatements() {
    return <div>Users Transfer Statements </div>;
  }
  function renderSettingsFrame() {
    return <SettingsFrame pageContent={renderStatements()} />;
  }
  return <div>{renderSettingsFrame()}</div>;
};

export default Statements;
