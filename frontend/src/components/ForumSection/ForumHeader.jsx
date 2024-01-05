import { Container, Row, Col } from "react-bootstrap";

const ForumHeader = ({
  title,
  author,
  createdAt,
  updatedAt,
  updatedAtTime,
  desc,
}) => {

  return (
    <Container className="forumheader-container p-4">
      <Row>
        <Col>
          <p className="forumheader-author">{author}</p>
        </Col>
        <Col className="text-end">
          <p className="forumheader-dates">{createdAt}</p>
        </Col>
      </Row>
      <Row className="py-2">
        <h3 className="forumheader-title">{title}</h3>
        <h4 className="forumheader-desc pt-2">{desc}</h4>
      </Row>
      <Row className="text-end pt-4">
        <p className="forumheader-dates">Updated {updatedAt} - {updatedAtTime}</p>
      </Row>
    </Container>
  );
};

export default ForumHeader;
