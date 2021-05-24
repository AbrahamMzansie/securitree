import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import ShowSpinner from "../../../components/UI/Spinner";
import KeyPress from "../../../components/UI/KeyPress";
import { useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Card,
} from "react-bootstrap";
import { getAllUnlockedDoors , lockDoor } from "../../../actions/hierarchyActions";

const DoorDetails = (props) => {
    console.log(props);
  const history = useHistory();

  const dispatch = useDispatch();
  const hierarchy = useSelector((state) => state.hierarchy);
  

  KeyPress('Enter', () => {
    history.push("/manage-doors");
  });

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
              <Card.Title>`Door ${props.doorId} ${props.status}`</Card.Title>
              <h6>Press ENTER to return to the main menu</h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default DoorDetails;
