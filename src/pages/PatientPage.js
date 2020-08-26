import React , {useState} from 'react'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PatientReadingForm from '../components/PatientReadingForm'



const PatientPage=() => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }



    return <>
    
    <Container className="mt-5">
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
                                Appointment
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
                                <FontAwesomeIcon icon={faCalendarCheck} size="sm"/>    
                            </Col>
                            <Col sm="10">
                                Records
                            </Col>    
                        </Row>
                    </NavLink>
                    </NavItem>

                    {/* <NavItem>
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
                    </NavItem> */}

                </Nav>
            

        </Col>
        <Col sm="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                <Row>
                    <Col sm="12">

                    <PatientReadingForm/>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</h5>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                <Row>
                    <Col sm="6">
                    <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                    </Col>
                    <Col sm="6">
                    <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                    </Col>
                </Row>
                </TabPane>
            </TabContent>
        </Col>
        </Row>
    </Container>
  );</>
  
}




export default PatientPage
  


