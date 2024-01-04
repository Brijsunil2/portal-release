import "./SettingScreen.css";
import { Container } from "react-bootstrap";
import AccountInfoForm from "../../components/AccountInfoForm/AccountInfoForm";

const SettingScreen = () => {
  return (
    <div className="settingscreen-container">
      <div className="primary-container">
        <Container>
          <h2>Settings</h2>
          <AccountInfoForm />
        </Container>
      </div>
    </div>
  );
};

export default SettingScreen;
