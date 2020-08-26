import React, { useState } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser, faUserEdit, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUpForm from "../components/SignUpForm"
import SearchBar from "../components/SearchBar"
import Calendar from "../components/Calendar"
import PatientList from "../components/PatientList"
import EditPersonalForm from "../components/EditPersonalForm"
// import EditPatientForm from "../components/EditPatientForm"
import "../styles/Dashboard.css";
import AppointmentList from '../components/AppointmentList';

const AdminPage = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [showAppointment, setShowAppointment] = useState(false);

  return (
      <Container className="mt-5 mb-3 bg-light">
        <div className="dashboard">
        <h2 style={{color:"#205072"}}> - Welcome, StellaLuna - </h2>
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
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
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
                        className={classnames({ active: activeTab === '5' })}
                        onClick={() => { toggle('5'); }}
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
                        {/* <EditPatientForm/> */}
                    </Col>
                </TabPane>
                <TabPane tabId="3">
                    <Col sm="12">
                        <SearchBar/>
                        <br/>
                        <Calendar showAppointment={showAppointment} setShowAppointment={setShowAppointment}/>
                        <br/>
                        <AppointmentList showAppointment={showAppointment} setShowAppointment={setShowAppointment}/>
                    </Col>
                </TabPane>
                <TabPane tabId="4">
                    <SearchBar/>
                    <br/>
                    <PatientList/>
                </TabPane>
                <TabPane tabId="5">
                    <Col sm="12">
                        <EditPersonalForm/>
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