import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import ShowSpinner from "../../../components/UI/Spinner";
import AlertMessage from "../../../components/UI/AlertMessage";
import KeyPress from "../../../components/UI/KeyPress";
import { useHistory } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";

const DoorDetails = () => {
  const history = useHistory();
  const hierarchy = useSelector((state) => state.hierarchy);

  KeyPress("Enter", () => {
    
    const page = "/";

    history.push(page);
  });
  const renderData = () => {
    let data = null;
    if (hierarchy.loading) {
      data = (
        <ShowSpinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        />
      );
    } else if (hierarchy.error) {
      data = <AlertMessage variant="danger" message={hierarchy.error} />;
    } else if (hierarchy && hierarchy.doorDetals) {
      const status =
        hierarchy.doorDetals.status === "closed" ? "LOCKED" : "UNLOCKED";
      data = (
        <Card.Title>{`Door ${hierarchy.doorDetals.id} ${status}`}</Card.Title>
      );
    }
    return data;
  };

  return (
    <Layout manageDoors>
      <Row
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col md={{ span: 6, offset: 12 }}>
          <Card>
            <Card.Header>Lock Door</Card.Header>
            <Card.Body>
              {renderData()}
              <h6>Press ENTER to return to the main menu</h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default DoorDetails;
