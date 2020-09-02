import React, { useState, useEffect } from 'react'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faMarker, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PatientReadingForm from '../components/PatientReadingForm'
import CountDown from '../components/CountDown';
import axios from 'axios'
import PatientRecordList from '../components/PatientRecordList';
import EditPersonalForm from '../components/EditPersonalForm';
import { NavLink as RouterNavLink } from 'react-router-dom';



const PatientPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    // const [time,setTime]=useState("")
    const [appointments, setAppointments] = useState([])
    const [formdisplay, setFormDisplay] = useState("none")
    const [button, setButton] = useState(true)
    const [appointmenttimes, setAppointmenttimes] = useState([])
    const [btn0, setBtn0] = useState(true)
    const [isPatient, setIsPatient] = useState("");
    const [isGuardian, setIsGuardian] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/v1/appointments/me',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(result => {
                console.log("findingusername")
                console.log(result.data)
                let upcoming_appointments=[]
                upcoming_appointments = result.data.patient_record
                let newArray_appointments = []
                let newArray_appointmenttime = []
                if (upcoming_appointments){

                    upcoming_appointments.forEach(appointment => {
                        newArray_appointments.push(appointment)
                        newArray_appointmenttime.push(appointment.start_time)
                    });
                }

                setAppointments(newArray_appointments)
                setAppointmenttimes(newArray_appointmenttime)
            })  
    }, [])
    console.log(appointments)
    console.log(appointmenttimes)

    let testing = appointmenttimes.forEach(appointmenttime => {
        // console.log(typeof (appointmenttime))
    })




    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const handleButton = () => {
        console.log("button clicked")
        if (formdisplay == "none") {
            setFormDisplay("")
        }
        else {
            setFormDisplay("none")
        }


    }
    // console.log(formdisplay)
    let endtimeyear = 0
    let endtimemonth = 0
    let endtimeday = 0
    let endtimehour = 0
    let endtimeminute = 0
    if (appointments.length>0){

        endtimeday = (appointments[0].end_time.slice(5, 7))
        endtimemonth = (appointments[0].end_time.slice(8, 11))
        endtimeyear = (appointments[0].end_time.slice(12, 16))
        endtimehour = (appointments[0].end_time.slice(17, 19))
        endtimeminute = (appointments[0].end_time.slice(20, 22))
        // console.log(endtimeminute)
    
        if (endtimemonth == "Jan") {
            endtimemonth = 0
        }
        if (endtimemonth == "Feb") {
            endtimemonth = 1
        }
        if (endtimemonth == "Mar") {
            endtimemonth = 2
        }
        if (endtimemonth == "Apr") {
            endtimemonth = 3
        }
        if (endtimemonth == "May") {
            endtimemonth = 4
        }
        if (endtimemonth == "Jun") {
            endtimemonth = 5
        }
        if (endtimemonth == "Jul") {
            endtimemonth = 6
        }
        if (endtimemonth == "Aug") {
            endtimemonth = 7
        }
        if (endtimemonth == "Sep") {
            endtimemonth = 8
        }
        if (endtimemonth == "Oct") {
            endtimemonth = 9
        }
        if (endtimemonth == "Nov") {
            endtimemonth = 10
        }
        if (endtimemonth == "Dis") {
            endtimemonth = 11
        }
    }
    // differnet is the seconds from currenttime to the date
    const aendtime = new Date(endtimeyear,endtimemonth, endtimeday, endtimehour, endtimeminute, 0, 0)
    const timenow = new Date()
    // console.log(aendtime - timenow)
    // console.log(difference) 
    const triggerButton = (timeLeft) => {
        // let btn0=true
        // console.log(timeLeft["days"])
        // console.log(timeLeft["hours"])
        // console.log(timeLeft["minutes"])
        if ((timeLeft["days"] <= 0 && timeLeft["hours"] <= 0 && timeLeft["minutes"] < 15) && (aendtime - timenow > 0)) {
            setBtn0(false)
        }

    }



    return <>

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
                                <FontAwesomeIcon icon={faUserPlus} size="sm" />
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
                                <FontAwesomeIcon icon={faMarker} size="sm"/>  
                            </Col>
                            <Col sm="10">
                                Patient's Record
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
                        <NavLink tag={RouterNavLink} to="/guardian" style={{color:"#205072"}}>
                            Redirect to Guardian Page
                        </NavLink>
                        </>
                        : null
                    }


                </Col>
                <Col sm="9">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <p>Next appointment:</p>
                                    <h3 style={{ color:"#205072"}}><CountDown closest_appointment_datetime={appointmenttimes[0]} triggerButton={triggerButton} /></h3>
                                    <p>You will have {appointments.length} upcoming appointments following date.</p>
                                    <p>You can only click on your appointment to and fill up ur readings 15mins before your appointment.</p>
                                    <br/>
                                    {appointments.map((appointment, index) => {
                                        if (index == 0) {
                                            return (
                                                <>
                                                <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                                                    <li><NavLink disabled={btn0} onClick={handleButton}>{appointment.start_time}</NavLink></li>
                                                    <li className="border border-secondary p-4" style={{ display: formdisplay }}>
                                                        <div><PatientReadingForm appointment_id={appointment.appointment_id}/></div>
                                                    </li>
                                                </ul>
                                                </>)
                                        } else {
                                            return <>
                                                <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                                                <li><NavLink disabled onClick={handleButton}>{appointment.start_time}</NavLink></li>
                                                </ul>
                                            </>
                                        }

                                    })}
                                    


                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <PatientRecordList user={user}/>
                                </Col>
                            </Row>
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
  </>

}




export default PatientPage



