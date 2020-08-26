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
import { useHistory } from 'react-router-dom';
import { faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Topbar = (props) => {
  const {token, setToken} = props
  const history = useHistory()

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setToken(null)
    history.push("/")
  }

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
              {
                token
                  ? <NavLink style={{color:"#205072", cursor:"pointer"}}onClick={handleSignOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="sm" className="mr-2"/>Logout
                    </NavLink> 
                  : <> </>
                }
          </NavLink>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;