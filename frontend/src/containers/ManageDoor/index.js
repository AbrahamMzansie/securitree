import React from "react";
import Layout from "../../components/Layout";
import { ListGroup } from "react-bootstrap";

const ManageDoor = (props) => {
  return (
    <Layout sidebar manageDoors>
      <h3>Manage Door</h3>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Manage Door Options
        </ListGroup.Item>
        <ListGroup.Item as="li">Lock Door</ListGroup.Item>
        <ListGroup.Item as="li">Unlock Door</ListGroup.Item>
        <ListGroup.Item as="li">Back</ListGroup.Item>
      </ListGroup>
    </Layout>
  );
};

export default ManageDoor;
