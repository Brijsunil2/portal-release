import "./AppSection.css";
import { Col, Container, Row } from "react-bootstrap";
import { MdForum } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { FaBoxArchive } from "react-icons/fa6";
import { IoIosCalculator } from "react-icons/io";
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
            <AppEntry appName="Calendar" appIcon={<BsCalendarEvent />} appDesc="Coming soon"/>
            </Col>
            <Col className="my-2" md>
            <AppEntry appName="Storage" appIcon={<FaBoxArchive />} appDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
            </Col>
          </Row>
          <Row>
            <Col className="my-2" md>
            <AppEntry appName="Calculator" appIcon={<IoIosCalculator />} appDesc="Feugiat scelerisque varius morbi enim. Aliquam vestibulum morbi blandit cursus risus at ultrices mi."/>
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
