import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row , Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowMessage from "../../components/UI/AlertMessage";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions/authActions";
import ShowSpinner from "../../components/UI/Spinner";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      userName: userName,
      password: password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    
      <Layout>
        <Container>
          {auth.loading
            ? null
            : auth &&
              auth.error && (
                <ShowMessage message={auth.error} variant="danger" />
              )}
          <Row style={{ marginTop: "50px" }}>
           
            <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>Welcome To Securitree</Card.Header>
              <Card.Body>
                <Card.Title>Please enter you login credentials to begin</Card.Title>
                <Card.Text>
                <Form onSubmit={(e) => userLogin(e)}>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type={"text"}
                  label="userName"
                  placeholder="userName"
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  placeholder="Password"
                />

                <Button
                  onClick={(e) => userLogin(e)}
                  variant="primary"
                  type="submit"
                >
                  {auth.loading ? (
                    <ShowSpinner
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                      }}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
                </Card.Text>
                
              </Card.Body>
            </Card>
             
            </Col>
          </Row>
        </Container>
      </Layout>
   
  );
};

export default Signin;
