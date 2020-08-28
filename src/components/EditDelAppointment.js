import React, { useState } from "react";
import {FormGroup,Label,Input, Col, Row} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify"
import SearchBar from "./SearchBar";

    const EditDelAppointment = () => {

    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    const [searchIc, setSearchIc] = useState('');

    const handleButtonClick = (e) =>{
      console.log(searchIc)
      axios.get('http://127.0.0.1:5000/api/v1/appointments/show$', 
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }, 
        data:{
            ic_number: searchIc
        }
      })
        .then(result => {
          let user = result.data
          console.log(result.data)
          console.log(user.name, user.email, user.ic_number)
          setDoctor(user.doctor_id)
          setPatient(user.patient_id)
          setStartDateTime(user.start_datetime.replace(' ', 'T'))
          setEndDateTime(user.end_datetime.replace(' ', 'T'))
        })
        .catch(error => {
          console.log('ERROR: ', error)
      })
    }

    const handleKeypress = e => {
      //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleButtonClick();
      }
    };

    const handleEditAppt = (e) =>{
        e.preventDefault()
        console.log(doctor,patient,startDateTime, endDateTime)
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/appointments/create',
          headers: 
            {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }, 
          data: {
            doctor_id: doctor,
            patient_id: patient,
            start_datetime: startDateTime,
            end_datetime: endDateTime,
          }
        })
        .then(response => {
          toast.success("Successfully created a user.", {
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


    return(
        <>
        <form onSubmit={handleEditAppt}>
            <h3 style={{color:"#205072"}}>Edit An Appointment</h3>
            <br/>
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
                    <Input type="text" onChange={handlePatientInput} name="patient_id" id="patient_id" value={patient} placeholder="Enter Patient NRIC Number" />
                </FormGroup>
                </Col>

            </Row>

            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="startingTime">Starting DateTime</Label>
                    <Input type="datetime-local" onChange={handleStartDateTimeInput} name="datetime" value={startDateTime} id="startingTime"/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="endTime">End DateTime</Label>
                    <Input type="datetime-local" onChange={handleEndDateTimeInput} name="datetime" value={endDateTime} id="endTime"/>
                </FormGroup>
                </Col>
            </Row>
            <br/>
            <Input type="submit" className="btn btn-primary btn-block" value="EDIT APPOINTMENT"/>{' '}
    </form>
        <br/>
    <form>
        <Input type="submit" className="btn btn-danger btn-block" value="DELETE APPOINTMENT"/>{' '}
    </form>
    </>
  );
}

export default EditDelAppointment;