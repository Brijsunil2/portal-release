import "./LoadingScreen.css";
import { Container, Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <Container className="loadingscreen-container">
      <Spinner/>
    </Container>
  );
};

export default LoadingScreen;
