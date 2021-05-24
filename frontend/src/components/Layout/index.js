import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./style.css";

const Layout = (props) => {
  return (
    <>
      <Header manageDoors={props.manageDoors} />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col style={{ marginLeft: "auto", paddingTop: "20px" }} md={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        <> {props.children}</>
      )}
    </>
  );
};

export default Layout;
