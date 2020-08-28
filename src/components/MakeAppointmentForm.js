import React, { useState } from "react";
import {FormGroup,Label,Input, Col, Row} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify"

const MakeAppointmentForm = () => {

    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");


    const handleMakeAppt = (e) =>{
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
            doctor_ic: doctor,
            patient_ic: patient,
            start_datetime: startDateTime.replace('T', ' '),
            end_datetime: endDateTime.replace('T', ' '),
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
        <form onSubmit={handleMakeAppt}>
            <h3 style={{color:"#205072"}}>Make An Appointment</h3>
            <br/>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="dr_id">Doctor</Label>
                    <Input type="text" onChange={handleDoctorInput} maxLength = "12" name="dr_id" id="dr_id" value={doctor} placeholder="Enter Doctor NRIC Number" />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="patient_id">Patient</Label>
                    <Input type="text" onChange={handlePatientInput} maxLength = "12" name="patient_id" id="patient_id" value={patient} placeholder="Enter Patient NRIC Number" />
                </FormGroup>
                </Col>

            </Row>

            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="startingTime">Starting DateTime</Label>
                    <Input type="datetime-local" onChange={handleStartDateTimeInput} name="datetime" step="1" value={startDateTime} id="startingTime"/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="endTime">End DateTime</Label>
                    <Input type="datetime-local" onChange={handleEndDateTimeInput} name="datetime" step="1" value={endDateTime} id="endTime"/>
                </FormGroup>
                </Col>
            </Row>
            <br/>
            <Input type="submit" className="btn btn-primary btn-block" value="MAKE APPOINTMENT"/>{' '}
    </form>
  );
}

export default MakeAppointmentForm