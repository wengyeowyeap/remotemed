import React, { useState } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar"
import Calendar from "../components/Calendar"
import PatientList from "../components/PatientList"
import EditUserForm from "../components/EditUserForm"
import "../styles/Dashboard.css";

const DoctorPage = (props) => {
  const{isDoctor} = props
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
      <Container className="mt-5 mb-3 bg-light">
        <div className="dashboard">
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
                                <FontAwesomeIcon icon={faUserEdit} size="sm"/> 
                            </Col>
                            <Col sm="10">
                                Edit Personal Profile
                            </Col>    
                        </Row>
                    </NavLink>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
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
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
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
                </Nav>
            

        </Col>
        <Col sm="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <EditUserForm isDoctor={isDoctor}/>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <SearchBar/>
                        <br/>
                        <Calendar/>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                <Row>
                    <Col sm="12">
                        <SearchBar/>
                        <br/>
                        <PatientList/>
                    </Col>
                </Row>
                </TabPane>
            </TabContent>
        </Col>
        </Row>
        </div>
    </Container>
  );
}

export default DoctorPage;