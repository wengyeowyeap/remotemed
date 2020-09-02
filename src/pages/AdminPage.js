import React, { useState } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser, faUserEdit, faEdit, faCalendarPlus, faCalendarCheck, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUpForm from "../components/SignUpForm"
import Calendar from "../components/Calendar"
import EditPersonalForm from "../components/EditPersonalForm"
import EditPatientForm from "../components/EditPatientForm"
import MakeAppointmentForm from "../components/MakeAppointmentForm"
import "../styles/Dashboard.css";
import AppointmentList from '../components/AppointmentList';
import EditDelAppointment from '../components/EditDelAppointment';
import PatientList2 from '../components/PatientList2';
import AdminCheckApptList from '../components/AdminCheckApptList';

const AdminPage = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [user, setUser] = useState({});


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
                                Register New User
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
                                <FontAwesomeIcon icon={faUserEdit} size="sm"/>  
                            </Col>
                            <Col sm="10">
                                Edit Patient's Profile
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
                                <FontAwesomeIcon icon={faCalendarPlus} size="sm"/>    
                            </Col>
                            <Col sm="10">
                                Make Appointment
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >
                        <Row>
                            <Col sm="2">
                                <FontAwesomeIcon icon={faCalendarTimes} size="sm"/>    
                            </Col>
                            <Col sm="10">
                                Edit/Delete Appointment
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>

                    <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '5' })}
                        onClick={() => { toggle('5'); }}
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
                        className={classnames({ active: activeTab === '6' })}
                        onClick={() => { toggle('6'); }}
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
                        className={classnames({ active: activeTab === '7' })}
                        onClick={() => { toggle('7'); }}
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
                        <SignUpForm/>
                    </Col>
                </TabPane>
                <TabPane tabId="2">
                    <Col sm="12">
                        <EditPatientForm/>
                    </Col>
                </TabPane>
                <TabPane tabId="3">
                    <Col sm="12">
                        <MakeAppointmentForm/>
                    </Col>
                </TabPane>
                <TabPane tabId="4">
                    <Col sm="12">
                        <EditDelAppointment/>
                    </Col>
                </TabPane>
                <TabPane tabId="5">
                    <Col sm="12">
                        <AdminCheckApptList/>
                    </Col>
                </TabPane>
                <TabPane tabId="6">
                        <PatientList2/>
                </TabPane>
                <TabPane tabId="7">
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

export default AdminPage;