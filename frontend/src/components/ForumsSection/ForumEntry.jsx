import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const ForumEntry = ({
  _id,
  author,
  dateCreated,
  title,
  desc = "",
  numPosts,
}) => {
  const navagate = useNavigate();
  
  const handleOnClick = async () => {
    navagate(`/forum/${_id}`);
  }

  return (
    <motion.div
      className="forumentry-container"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOnClick}
    >
      <Row className="d-flex p-3">
        <Col className="forumentry-col-1" xs={9}>
          <p className="forumentry-author pb-2">{author}</p>
          <h3 className="forumentry-title px-1">{title}</h3>
          <h4 className="forumentry-desc px-1">{desc}</h4>
        </Col>
        <Col className="forumentry-col-3" xs={3}>
        <p className="forumentry-datecreated pb-2">{dateCreated}</p>
          <p className="forumentry-numposts">{numPosts}</p>
          <p className="forumentry-numposts">Posts</p>
        </Col>
      </Row>
    </motion.div>
  );
};

export default ForumEntry;
