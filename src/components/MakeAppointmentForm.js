import React, { useState } from "react";
import {FormGroup,Label,Input, Col, Row, FormText, FormFeedback} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify"

const MakeAppointmentForm = () => {

    const [doctor, setDoctor] = useState({});
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
            doctor_ic: doctorIcNum,
            patient_ic: patientIcNum,
            start_datetime: startDateTime.replace('T', ' '),
            end_datetime: endDateTime.replace('T', ' '),
          }
        })
        .then(response => {
          toast.success("Successfully make an appointment.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          let user = response.data.user
          setDoctorIcNum("")
          setPatientIcNum("")
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
// axios call to check doctor ic is == doctor

      const [doctorIcNum, setDoctorIcNum] = useState("");  

      const checkDoctorAvailability = doctorIcNum => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check doctor ic!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/users/check_doctor?doctor_ic=${doctorIcNum}`
          )
          .then(response => {
            setDoctor(response.data)
            console.log(response.data);
            if (response.data.is_doctor) {
              setIcDoctorValid(true);
            } else {
              setIcDoctorValid(false);
            }
          });
      };

      const [icDoctorValid, setIcDoctorValid] = useState(false);
      const [delayDoctorIc, setDelayDoctorIc] = useState(null);

      const handleDoctorInput = e => {
        clearTimeout(delayDoctorIc);
        const newDoctorIc = e.target.value
        setDoctorIcNum(newDoctorIc)
        const newDelay = setTimeout(() => {      
          checkDoctorAvailability(newDoctorIc);
        }, 500);    
        setDelayDoctorIc(newDelay);
      };

      let icDoctorFormat = /([0-9]){2}([0-1]){1}([0-9]){1}([0-3]){1}([0-9]){7}/
      let icDoctorFormFeedback
      let icDoctorIsValid
      let icDoctorIsInvalid
      if (doctorIcNum.length === 0){
        icDoctorFormFeedback = <FormFeedback></FormFeedback>
      } else if (doctorIcNum.match(icDoctorFormat) && icDoctorValid){
        icDoctorFormFeedback = <FormText color="success">Doctor's Name: {doctor.name}</FormText>
        icDoctorIsValid = true
        icDoctorIsInvalid = false
      } else if (!doctorIcNum.match(icDoctorFormat)){    
        icDoctorFormFeedback = <FormText color="danger">Please input the correct IC format</FormText>
        icDoctorIsValid = false
        icDoctorIsInvalid = true
      } else if(!icDoctorValid){    
        icDoctorFormFeedback = <FormText color="danger">Sorry! User not exist</FormText>
        icDoctorIsValid = true
        icDoctorIsInvalid = false
      } 

    // axios call to check patient ic is == patient

    const [patientIcNum, setPatientIcNum] = useState("");  

    const checkPatientAvailability = patientIcNum => {
      // this should only trigger after you stop typing for 500ms
      console.log("Making API call to check patient ic!");
      axios
        .get(
          `http://127.0.0.1:5000/api/v1/users/check_patient?patient_ic=${patientIcNum}`
        )
        .then(response => {
          setPatient(response.data)
          console.log(response.data);
          if (response.data.is_patient) {
            setIcPatientValid(true);
          } else {
            setIcPatientValid(false);
          }
        });
    };

    const [icPatientValid, setIcPatientValid] = useState(false);
    const [delayPatientIc, setDelayPatientIc] = useState(null);

    const handlePatientInput = e => {
      clearTimeout(delayPatientIc);
      const newPatientIc = e.target.value
      setPatientIcNum(newPatientIc)
      const newDelay = setTimeout(() => {      
        checkPatientAvailability(newPatientIc);
      }, 500);    
      setDelayPatientIc(newDelay);
    };

    let icPatientFormat = /([0-9]){2}([0-1]){1}([0-9]){1}([0-3]){1}([0-9]){7}/
    let icPatientFormFeedback
    let icPatientIsValid
    let icPatientIsInvalid
    if (patientIcNum.length === 0){
      icPatientFormFeedback = <FormFeedback></FormFeedback>
    } else if (patientIcNum.match(icPatientFormat) && icPatientValid){
      icPatientFormFeedback = <FormText color="success">Patient's Name: {patient.name}</FormText>
      icPatientIsValid = true
      icPatientIsInvalid = false
    } else if (!patientIcNum.match(icPatientFormat)){    
      icPatientFormFeedback = <FormText color="danger">Please input the correct IC format</FormText>
      icPatientIsValid = false
      icPatientIsInvalid = true
    } else if(!icPatientValid){    
      icPatientFormFeedback = <FormText color="danger">Sorry! Patient not exist</FormText>
      icPatientIsValid = true
      icPatientIsInvalid = false
    } 

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
                    <Input type="text" onChange={handleDoctorInput} maxLength = "12" name="dr_id" id="dr_id" value={doctorIcNum} placeholder="Enter Doctor NRIC Number" 
                    valid={icDoctorIsValid}
                    invalid={icDoctorIsInvalid}
                    />
                    {icDoctorFormFeedback}
                
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="patient_id">Patient</Label>
                    <Input type="text" onChange={handlePatientInput} maxLength = "12" name="patient_id" id="patient_id" value={patientIcNum} placeholder="Enter Patient NRIC Number" 
                    valid={icPatientIsValid}
                    invalid={icPatientIsInvalid}
                    />
                    {icPatientFormFeedback}
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