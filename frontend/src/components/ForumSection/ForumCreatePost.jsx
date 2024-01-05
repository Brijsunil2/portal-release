import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

const ForumCreatePost = ({ socket, forumID }) => {
  const [validate, setValidate] = useState(true);

  const { Formik } = formik;

  const formSchema = yup.object().shape({
    msg: yup.string().required(),
  });

  const submitHandler = async (values) => {
    setValidate(true);

    socket.emit("forumReply", {
      msg: values.msg,
      author: "Joe2323",
      authorID: "1111",
      forumID: forumID,
    });
  };

  return (
    <Formik
      validationSchema={formSchema}
      onSubmit={(values) => submitHandler(values)}
      initialValues={{
        msg: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Reply"
                name="msg"
                value={values.msg}
                onChange={handleChange}
                isInvalid={errors.msg && touched.msg}
              />
              <Form.Control.Feedback type="invalid">
                {validate ? "Please enter a reply" : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">
            {false ? (
              <Spinner
                className="create-forum-spinner"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Reply"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForumCreatePost;
