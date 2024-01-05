import { Row } from "react-bootstrap";

const ForumPostEntry = ({ msg, author, createdAt, createdAtTime }) => {
  return (
    <div className="forumpostentry-container p-3 mx-3">
      <Row>
        <p className="forumpost-author">{author}</p>
      </Row>
      <Row className="py-2">
        <p className="forumpost-msg">{msg}</p>
      </Row>
      <Row className="text-end">
        <p className="forumpost-dates">
          Posted {createdAt} - {createdAtTime}
        </p>
      </Row>
    </div>
  );
};

export default ForumPostEntry;
