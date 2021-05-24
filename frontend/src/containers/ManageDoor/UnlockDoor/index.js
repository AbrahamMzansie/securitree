import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import ShowSpinner from "../../../components/UI/Spinner";
import AlertMessage from "../../../components/UI/AlertMessage";
import KeyPress from "../../../components/UI/KeyPress";
import { useHistory } from "react-router-dom";
import {
  InputGroup,
  FormControl,
  Button,
  Col,
  Row,
  Card,
} from "react-bootstrap";

import { getAllLockedDoors,unLockDoor } from "../../../actions/hierarchyActions";

const UnlockDoor = () => {
  const history = useHistory();
  const [doorID, setDoorID] = useState("");
  const [allLockedDoors, setAllLockedDoors] = useState([]);

  const dispatch = useDispatch();
  const hierarchy = useSelector((state) => state.hierarchy);

  useEffect(() => {
    dispatch(getAllLockedDoors());
    setAllLockedDoors(hierarchy.unLockedDoors);
  }, [allLockedDoors]);

  KeyPress("Escape", () => {
    history.push("/manage-doors");
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (doorID) {
        dispatch(unLockDoor(doorID));
          setDoorID("");
          history.push(
            `/${hierarchy.doorDetals.id}/${hierarchy.doorDetals.status}/doorDetails`
          );
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [doorID]);

  const onChangeDoorHandler = (e, doorName) => {
    e.preventDefault();
    setDoorID(doorName);
  };
  const createLockedDoorsList = (lockedDoors, options = []) => {
    for (let lockedDoor of lockedDoors) {
      options.push({
        id: lockedDoor.id,
        name: lockedDoor.name,
      });
    }
    return options;
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
            <Card.Header>Unlock Door</Card.Header>
            <Card.Body>
              <Card.Title>Please enter ID of the door to unlock</Card.Title>
              <h6>Press ESC to return to door management screen</h6>
            
                <br />
                <select
                  style={{ marginBottom: "10px" }}
                  value={doorID}
                  onChange={(e) => onChangeDoorHandler(e, e.target.value)}
                  className="form-control"
                >
                  <option>Find Door ID By Name</option>
                  {hierarchy &&
                    hierarchy.lockedDoors &&
                    createLockedDoorsList(hierarchy.lockedDoors).map(
                      (option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      )
                    )}
                </select>
                <br />
                <InputGroup className="mb-3">
                  <FormControl
                    value={doorID}
                    onChange={(e) => setDoorID(e.target.value)}
                    placeholder="Enter Door ID"
                    aria-label="Enter Door ID"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary">
                      Search by Door ID
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                {hierarchy.loading ? (
                  <ShowSpinner
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItem: "center",
                    }}
                  />
                ) : (
                  hierarchy.error && (
                    <AlertMessage variant="danger" message={hierarchy.error} />
                  )
                )}
           
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default UnlockDoor;
