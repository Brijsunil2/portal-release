import "./AppSection.css";
import { Col, Container, Row } from "react-bootstrap";
import { MdForum } from "react-icons/md";
import AppEntry from "./AppEntry";

const AppSection = () => {
  return (
    <div className="appsection-container">
      <Container>
        <h2>Applications</h2>
        <Container className="appentries-container">
          <Row>
            <Col className="my-2" md>
            <AppEntry appName="Forums" appIcon={<MdForum />} appDesc="A platform where users can create forum groups to communicate, ask questions or share any concerns."/>
            </Col>
            <Col className="my-2" md>
            </Col>
            <Col className="my-2" md>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default AppSection;
