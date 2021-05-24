import React from "react";
import Layout from "../../components/Layout";
import { ListGroup } from "react-bootstrap";
import  "./style.css";

const Home = () => {
  return (
    <Layout sidebar>
       <h3>Manage Securitree Application</h3>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
        View Security Entity Hierarchy
        </ListGroup.Item>
        <ListGroup.Item as="li">Manage Doors</ListGroup.Item>
        <ListGroup.Item as="li">Logout</ListGroup.Item>
        
      </ListGroup>
    </Layout>
  );
};

export default Home;
