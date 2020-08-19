import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Topbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RouterNavLink} to="/">
            <img src = "https://www.columbiaasia.com/malaysia/sites/default/files/logo-cah.png" alt="Home"></img>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink tag={RouterNavLink} to="/">Home</NavLink>
            </NavItem> */}
          </Nav>
          <NavbarText className= "mr-3">RemoteMed</NavbarText>
          <NavLink style={{color:"lavender"}}>
              Log In
          </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;