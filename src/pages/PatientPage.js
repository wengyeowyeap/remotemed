import React, { useState, useEffect } from 'react'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { faUserPlus, faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PatientReadingForm from '../components/PatientReadingForm'
import CountDown from '../components/CountDown';
import axios from 'axios'



const PatientPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    // const [time,setTime]=useState("")
    const [appointments, setAppointments] = useState([])
    const [formdisplay, setFormDisplay] = useState("none")
    const [button, setButton] = useState(true)
    const [appointmenttimes, setAppointmenttimes] = useState([])
    const [btn0, setBtn0] = useState(true)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/v1/appointments/me',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(result => {

                let upcoming_appointments = result.data.patient_record
                let newArray_appointments = []
                let newArray_appointmenttime = []
                upcoming_appointments.forEach(appointment => {
                    newArray_appointments.push(appointment)
                    newArray_appointmenttime.push(appointment.appointment_time)
                });

                setAppointments(newArray_appointments)
                setAppointmenttimes(newArray_appointmenttime)
            })
    }, [])
    console.log(appointments)
    console.log(appointmenttimes)

    let testing = appointmenttimes.forEach(appointmenttime => {
        console.log(typeof (appointmenttime))
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
    console.log(formdisplay)
    let endtimeyear = 0
    let endtimemonth = 0
    let endtimeday = 0
    let endtimehour = 0
    let endtimeminute = 0
    if (appointments.length>0){

        endtimeday = (appointments[0].appointment_endtime.slice(5, 7))
        endtimemonth = (appointments[0].appointment_endtime.slice(8, 11))
        endtimeyear = (appointments[0].appointment_endtime.slice(12, 16))
        endtimehour = (appointments[0].appointment_endtime.slice(17, 19))
        endtimeminute = (appointments[0].appointment_endtime.slice(20, 22))
        console.log(endtimeminute)
    
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
    console.log(aendtime - timenow)
    // console.log(difference) 
    const triggerButton = (timeLeft) => {
        // let btn0=true
        console.log(timeLeft["days"])
        console.log(timeLeft["hours"])
        console.log(timeLeft["minutes"])
        if ((timeLeft["days"] <= 0 && timeLeft["hours"] <= 0 && timeLeft["minutes"] < 15) && (aendtime - timenow > 0)) {
            setBtn0(false)
        }

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
                                        <FontAwesomeIcon icon={faCalendarCheck} size="sm" />
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
                                    <div style={{ display: "flex" }}><CountDown closest_appointment_datetime={appointmenttimes[0]} triggerButton={triggerButton} /></div>
                                    <p>You will have {appointments.length} upcoming appointments following date.</p>
                                    <p>You can only click on your appointment to and fill up ur readings 15mins before your appointment.</p>
                                    {appointments.map((appointment, index) => {
                                        if (index == 0) {
                                            return (
                                                <>
                                                    <li className="m-1"><Button disabled={btn0} color="primary" onClick={handleButton} style={{ width: "10vw" }}>{appointment.appointment_time}</Button></li>
                                                    <div style={{ display: formdisplay }}><PatientReadingForm appointment_id={appointment.appointment_id}/></div>
                                                </>)
                                        } else {
                                            return <>

                                                <li className="m-1"><Button disabled color="primary" onClick={handleButton} style={{ width: "10vw" }}>{appointment.appointment_time}</Button></li>

                                            </>
                                        }

                                    })}
                                    


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



