import React, { useState } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser, faUserEdit, faEdit, faCalendarPlus, faCalendarCheck, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditPersonalForm from "../components/EditPersonalForm"
import "../styles/Dashboard.css";
import GuardianPatientList from '../components/GuardianPatientList';
import GuardianPatientRecord from '../components/GuardianPatientRecord';
import { NavLink as RouterNavLink } from 'react-router-dom';

const GuardianPage = (props) => {
    const {token, setToken} = props;
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [isPatient, setIsPatient] = useState("");
  const [isGuardian, setIsGuardian] = useState("");
  const [user, setUser] = useState({});
  console.log(user)
  console.log(isGuardian)

  return (
      <Container className="mt-5 mb-3 bg-light">
        <div className="dashboard">
        <h2 style={{color:"#205072"}}> - Welcome, {user.name} - </h2>
        <br/>

        <Row>
        <Col sm="3">
            
                <Nav tabs className="flex-column nav-pills"> 
                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        <Row>
                            <Col sm="2">
                                <FontAwesomeIcon icon={faUserPlus} size="sm"/>
                            </Col>
                            <Col sm="10">
                                Edit Patient's Profile
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        <Row>
                            <Col sm="2">
                                <FontAwesomeIcon icon={faEdit} size="sm"/>  
                            </Col>
                            <Col sm="10">
                                Check Patient's Record
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        <Row>
                            <Col sm="2">
                                <FontAwesomeIcon icon={faEdit} size="sm"/>  
                            </Col>
                            <Col sm="10">
                                Edit Personal Profile
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>
                </Nav>
                <br/>
                {isPatient && isGuardian
                    ? <>
                    <NavLink tag={RouterNavLink} to="/patient" style={{color:"#205072"}}>
                        Redirect to Patient Page
                    </NavLink>
                    </>
                    : null
                }
                   

        </Col>
        <Col sm="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Col sm="12">
                        <GuardianPatientList guardian={user}/>
                    </Col>
                </TabPane>
                <TabPane tabId="2">
                    <Col sm="12">
                        <GuardianPatientRecord guardian={user}/>
                    </Col>
                </TabPane>
                <TabPane tabId="3">
                    <Col sm="12">
                        <EditPersonalForm user={user} setUser={setUser} setIsPatient={setIsPatient} setIsGuardian={setIsGuardian}/>
                    </Col>
                </TabPane>
            </TabContent>
        </Col>
        </Row>
        </div>
    </Container>
  );
}

export default GuardianPage;