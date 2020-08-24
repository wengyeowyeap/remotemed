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
      <Navbar className="navbar" expand="md">
        <NavbarBrand tag={RouterNavLink} to="/">
            <div>
              <img className="mr-3" src = "https://www.columbiaasia.com/malaysia/sites/default/files/logo-cah.png" alt="Home"></img>  
            </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink tag={RouterNavLink} to="/">Home</NavLink>
            </NavItem> */}
          </Nav>

          {/* temporary working use */}
          <NavLink tag={RouterNavLink} to="/admin" style={{color:"#205072"}}>
              Admin
          </NavLink>
          <NavLink tag={RouterNavLink} to="/doctor" style={{color:"#205072"}}>
              Doctor
          </NavLink>
          {/* end */}

          <NavLink style={{color:"#205072"}}>
              Log In
          </NavLink>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;