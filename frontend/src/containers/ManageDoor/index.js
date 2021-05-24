import React from "react";
import Layout from "../../components/Layout";
import { ListGroup } from "react-bootstrap";
import {Link} from "react-router-dom";

const ManageDoor = (props) => {
  return (
    <Layout sidebar manageDoors>
      <h3>Manage Door</h3>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Manage Door Options
        </ListGroup.Item>
        <ListGroup.Item as="li"><Link to = "lock-doors">Lock Door :</Link>  Opens the Lock Door screen, where the user can provide the identifier of a door to lock it</ListGroup.Item>
        <ListGroup.Item as="li"><Link to = "unlock-doors">Unlock Door :</Link> Opens the UnlockDoor screen, where the user can provide the identifier of a door to unlock it.</ListGroup.Item>
        <ListGroup.Item as="li"><Link to = "/">Back :</Link> Returns the user to the Home screen.</ListGroup.Item>
      </ListGroup>
    </Layout>
  );
};

export default ManageDoor;
