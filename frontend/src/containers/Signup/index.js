import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions/userActions";
import ShowSpinner from "../../components/UI/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  
  const onSignupHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      firstName,
      lastName,
    };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  
  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={(e) => onSignupHandler(e)}>
                <Row>
                  <Col md={6}>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type={"text"}
                      label="First name"
                      placeholder="First Name"
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type={"text"}
                      label="Last name"
                      placeholder="Last Name"
                    />
                  </Col>
                </Row>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"text"}
                  label="Email Address"
                  placeholder="Email Address"
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={"password"}
                  label="Password"
                  placeholder="Password"
                />
                {user.loading ? (
                  <ShowSpinner />
                ) : (
                  <Button
                    onClick={(e) => onSignupHandler(e)}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};

export default Signup;
