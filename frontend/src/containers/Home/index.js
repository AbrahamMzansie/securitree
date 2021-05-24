import React from "react";
import Layout from "../../components/Layout";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { signout } from "../../actions/authActions";
import {useDispatch} from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };
  return (
    <Layout sidebar>
      <h3>Manage Securitree Application</h3>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Main Menu Option
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Link to="/hierarchy">View Security Entity Hierarchy : </Link> Opens the SecurityEntityHierarchy screen
        </ListGroup.Item>
        <ListGroup.Item as="li"><Link to="/manage-doors">Manage Doors :</Link> Opens the Manage Doorsscreen</ListGroup.Item>
        <ListGroup.Item as="li" onClick =  {signOutHandler}><Link onClick = {signOutHandler}>Sign Out :</Link> Logs the user out of the applicationand redirects the userbackto the Login screen</ListGroup.Item>
      </ListGroup>
    </Layout>
  );
};

export default Home;
