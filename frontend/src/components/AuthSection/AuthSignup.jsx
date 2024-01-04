import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import * as formik from "formik";
import * as yup from "yup";

const AuthSignup = () => {
  const [validUsername, setValidUsername] = useState(true);
  const [vaildEmail, setValidEmail] = useState(true);

  const { Formik } = formik;

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required().min(5),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  });

  const navagate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (values) => {
    setValidUsername(true);
    setValidEmail(true);

    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res }));
      navagate("/");
    } catch (err) {
      if (err.status === 400) {
        switch (err.data.message) {
          case "Email already exists":
            setValidEmail(false);
            break;
          case "Username already exists":
            setValidUsername(false);
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
    <Container className="authsignup-container">
      <h2 className="auth-h2">Sign-up to get Started!</h2>

      <Formik
        validationSchema={formSchema}
        onSubmit={(values) => submitHandler(values)}
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your name
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  minLength="5"
                  maxLength="20"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={(errors.username || !validUsername) && touched.username}
                />
                <Form.Control.Feedback type="invalid">
                  {
                    validUsername ?
                    "Username must be a minimum of 5 characters long" :
                    "Username already exists"
                  }
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={(errors.email || !vaildEmail) && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {
                    vaildEmail ?
                    "Please provide a valid email" :
                    "Email already exists"
                  }
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  Password must have at least one lowercase, one uppercase, a
                  number and at least 8 characters long
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  type="password"
                  placeholder="Retype Password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  isInvalid={values.password !== values.confirmPassword  && touched.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords must match
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Sign-up"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AuthSignup;
