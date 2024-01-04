import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { IoMdArrowForward } from "react-icons/io";

const AppEntry = ({ appName, appIcon, appDesc }) => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/" + appName.toLowerCase());
  };

  return (
    <Card className="appentry-container">
      <Card.Header>{appIcon}</Card.Header>
      <Card.Body>
        <Card.Title>{appName}</Card.Title>
        <Card.Text>
          {appDesc}
        </Card.Text>
        <Button><IoMdArrowForward /></Button>
      </Card.Body>
    </Card>
  );
};

export default AppEntry;
