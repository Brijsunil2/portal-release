import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Container, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

const AuthLogin = () => {
  const [validate, setValidate] = useState(true);

  const { Formik } = formik;

  const formSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const navagate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (values) => {
    setValidate(true);

    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navagate("/");
    } catch (err) {
      if (err.status === 401) {
        switch (err.data.message) {
          case "Invalid email or password":
            setValidate(false);
            break;
          default:
            console.log(err?.data?.message || err.error);
        }
      } else {
        console.log(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="authlogin-container">
      <h2 className="auth-h2">Login to Portal!</h2>

      <Formik
        validationSchema={formSchema}
        onSubmit={(values) => submitHandler(values)}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={(errors.email || !validate) && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {validate ? "Please provide a valid email" : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={(errors.password || !validate) && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {validate
                    ? "Please provide a password"
                    : "Invalid email or password"}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AuthLogin;
