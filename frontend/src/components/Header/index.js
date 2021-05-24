import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signout } from "../../actions/authActions";

const Header = ({ manageDoors }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const signOutHandler = () => {
    dispatch(signout());
  };
  const viewSecurityHandler = () => {
    history.push("/hierarchy");
  };
  const manageDoorHandler = () => {
    history.push("/manage-doors");
  };

  const unlockDoorHandler = () => {
    history.push("/unlock-doors");
  };
  const lockDoorHandler = () => {
    history.push("/lock-doors");
  };

  const goBackHandler = () => {
    history.push("/");
  };

  const renderNonLoggedInLink = () => {
    return (
      <Nav style = {{cursor : "pointer"}}>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            Signin
          </NavLink>
        </li>
        
      </Nav>
    );
  };
  const renderLoggedInLink = () => {
    return (
      <Nav  style = {{cursor : "pointer"}}>
        {manageDoors ? (
          <>
            <li onClick={() => lockDoorHandler()} className="nav-item">
              <span className="nav-link">Lock Door</span>
            </li>
            <li onClick={() => unlockDoorHandler()} className="nav-item">
              <span className="nav-link">Unlock Door</span>
            </li>
            <li onClick={() => goBackHandler()} className="nav-item">
              <span className="nav-link">Back</span>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => viewSecurityHandler()} className="nav-item">
              <span className="nav-link">View Security Entity Hierarchy</span>
            </li>
            <li onClick={() => manageDoorHandler()} className="nav-item">
              <span className="nav-link">Manage Doors</span>
            </li>
            <li onClick={() => signOutHandler()} className="nav-item">
              <span className="nav-link">Sign Out</span>
            </li>
          </>
        )}
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1, position: "sticky" }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          SECURITREE - Security Dashboard
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/**
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            */}
          </Nav>
          {auth.authenticate ? renderLoggedInLink() : renderNonLoggedInLink()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
