import React, { useState } from "react";
import {FormGroup,Label,Input, Col, Row, NavLink, FormText, Button} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify"
import SearchBar from "./SearchBar";
import AppointmentList from "./AppointmentList";

  const EditDelAppointment = () => {

// axios call appointment List first //
    const [apptList, setApptList] = useState([]);
    const [searchIc, setSearchIc] = useState('');

    const handleButtonClick = (e) =>{
      console.log(searchIc)
      axios.get(`http://127.0.0.1:5000/api/v1/appointments/show?ic_number=${searchIc}`, 
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }, 
      })
        .then(result => {
          let apptList = result.data.all_list
          console.log(result.data.all_list)
          setApptList(apptList)
          setShowApptList(true)
          // setApptId(apptList.appointment_id)
        })
        .catch(error => {
          console.log('ERROR: ', error)
      })
    }

    const handleKeypress = e => {
    if (e.key === "Enter") {
      handleButtonClick();
      }
    };

    const eachAppointment = apptList.map((ap,i) => {
      return(
        <>
        <li key={i}>
          <Row>
            <Col sm="7">
            <NavLink value={ap.appointment_id} onClick={() => handleApptClick(ap.appointment_id)}>{ap.start_time}</NavLink>
            </Col>
            <Col sm="1" className="test-left">  
              <Button close onClick={()=> {handleCancelAppt(ap.appointment_id); NewApptList(ap.appointment_id);}}/>
            </Col>
            <Col sm="4">  
            </Col>
          </Row>
        </li>
        </> 
      )
  })

// axios call for particular one appointment using appointment id //

    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [showApptList,setShowApptList] = useState(false)
    const [showAppt,setShowAppt] = useState(false)


    const handleApptClick = (e) =>{ 
      console.log(e)
      axios.get(`http://127.0.0.1:5000/api/v1/appointments/search?appointment_id=${e}`,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }, 
      })
        .then(result => {
          let user = result.data
          console.log(result.data)
          setShowAppt(true)
          setDoctor(user.doctor_id)
          setPatient(user.patient_id)
          setStartDateTime(user.appointment_start)
          setEndDateTime(user.appointment_start)
        })
        .catch(error => {
          console.log('ERROR: ', error)
      })
    }


    const handleEditAppt = (e) =>{
        e.preventDefault()
        console.log(doctor,patient,startDateTime, endDateTime)
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/appointments/edit',
          headers: 
            {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }, 
          data: {
            doctor_id: doctor,
            patient_id: patient,
            start_datetime: startDateTime.replace('T', ' '),
            end_datetime: endDateTime.replace('T', ' '),
          }
        })
        .then(response => {
          toast.success("Successfully changed appointment's info!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          let user = response.data.user
          setDoctor("")
          setPatient("")
          setStartDateTime("")
          setEndDateTime("")
        })
        .catch(error => {
          console.error(error.message)
            toast.error((error.message), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
        })
      }
      

      const handleDoctorInput = e => {
        const newDoctor = e.target.value
        setDoctor(newDoctor)    
      };

      const handlePatientInput = e => {
        const newPatient = e.target.value
        setPatient(newPatient)    
      };

      const handleStartDateTimeInput = e => {
        const newStartTime = e.target.value
        setStartDateTime(newStartTime)    
      };

      const handleEndDateTimeInput = e => {
        const newEndTime = e.target.value
        setEndDateTime(newEndTime)    
      };

  // axios post to delete particular one appointment using appointment id //

  const NewApptList = (appointment_id) => {
    let eachAppointment = apptList.filter(ap => ap.appointment_id !=appointment_id)
    setApptList(eachAppointment)
  }

      const handleCancelAppt = (e) =>{
        // e.preventDefault()
        console.log(e)
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/appointments/delete',
          headers: 
            {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }, 
          data: {
            appointment_id: e,
          }
        })
        .then(response => {
          toast.success("Successfully deleted appointment", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        })
        .catch(error => {
          console.error(error.message)
            toast.error((error.message), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
        })
      }
      
    return(
        <>
        <SearchBar onButtonClick={handleButtonClick} searchIc={searchIc} setSearchIc={setSearchIc} onEnterPress={handleKeypress}/>
        <br/>
        <h3 style={{color:"#205072"}}>Edit/ Delete An Appointment</h3>
        <br/>
        <AppointmentList eachAppointment={eachAppointment} showApptList={showApptList} searchIc={searchIc} apptList={apptList} onApptClick={handleApptClick}/>
        {
          showAppt
          ? <form onSubmit={handleEditAppt}>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="dr_id">Doctor</Label>
                    <Input type="text" onChange={handleDoctorInput} name="dr_id" id="dr_id" value={doctor} placeholder="Enter Doctor NRIC Number" />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="patient_id">Patient</Label>
                    <Input disabled type="text" onChange={handlePatientInput} name="patient_id" id="patient_id" value={patient} placeholder="Enter Patient NRIC Number" />
                </FormGroup>
                </Col>

            </Row>

            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="startingTime">Starting DateTime</Label>
                    <Input type="datetime-local" onChange={handleStartDateTimeInput} name="datetime" step="1" value={startDateTime} id="startingTime"/>
                    <FormText>{startDateTime}</FormText>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="endTime">End DateTime</Label>
                    <Input type="datetime-local" onChange={handleEndDateTimeInput} name="datetime" step="1" value={endDateTime} id="endTime"/>
                    <FormText>{endDateTime}</FormText>
                </FormGroup>
                </Col>
            </Row>
            <br/>
            <Input type="submit" className="btn btn-primary btn-block" value="EDIT APPOINTMENT"/>{' '}
            </form>
          : null
        }
        
    </>
  );
}

export default EditDelAppointment;