import React, { useState } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faHospitalUser, faEdit, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar"
import Calendar from "../components/Calendar"
import PatientList2 from "../components/PatientList2"
import EditPersonalForm from "../components/EditPersonalForm"
import "../styles/Dashboard.css";

const DoctorPage = (props) => {
  const{isDoctor} = props
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState({});
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
      <Container className="mt-5 mb-3 bg-light">
        <div className="dashboard">
        <h2 style={{color:"#205072"}}> - Welcome, Dr. {user.name} - </h2>
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
                                <FontAwesomeIcon icon={faCalendarCheck} size="sm"/>
                            </Col>
                            <Col sm="10">
                                Appointment Schedules
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
                                <FontAwesomeIcon icon={faHospitalUser} size="sm"/>  
                            </Col>
                            <Col sm="10">
                                Check Patients
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
            

        </Col>
        <Col sm="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Col sm="12">
                        <Calendar/>
                    </Col>
                </TabPane>
                <TabPane tabId="2">
                    <Col sm="12">
                        
                        <PatientList2/>
                    </Col>
                </TabPane>
                <TabPane tabId="3">              
                    <Col sm="12">
                        <EditPersonalForm user={user} setUser={setUser}/>
                    </Col>              
                </TabPane>
            </TabContent>
        </Col>
        </Row>
        </div>
    </Container>
  );
}

export default DoctorPage;