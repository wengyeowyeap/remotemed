import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { Modal, Row, Col} from 'reactstrap';
import { NavLink } from 'reactstrap';
import PatientReport2 from './PatientReport2';

const GuardianPatientRecord = (props) => {
    const{guardian, className} = props;

    const [patientList, setPatientList]= useState([]);
    const [user, setUser] = useState("");
    const [icNum, setIcNum] = useState("");
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState ("male");
    const [disease, setDisease] = useState ([]);

    const toggle = () => setModal(!modal);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/users/show_my_patient`, 
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(result => {
            let patientList = result.data.my_patient
            console.log(result.data.my_patient)
            setPatientList(patientList)
          })
          .catch(error => {
            console.log('ERROR: ', error)
        })
      },[])

      const [report,setReport] = useState ([])
      const [record,setRecord] = useState ({})
      const [doctor, setDoctor] = useState({});
      const [appointmentId, setAppointmentId] = useState({});
      const [sugarLevel, setSugarLevel] = useState ("");
      const [cholesterolLevel, setCholesterolLevel] = useState ("");
      const [diaBloodPressure, setDiaBloodPressure] = useState ("");
      const [sysBloodPressure, setSysBloodPressure] = useState ("");
  
      const handleReportList = (e) =>{
          console.log(e)
          axios.get(`http://127.0.0.1:5000/api/v1/records/show?ic_number=${e}`, 
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          })
            .then(result => {
              let report = result.data.my_patient_record
              console.log(result.data.my_patient_record)
              setReport(report)
              setAppointmentId(report.appointment_id)
            })
            .catch(error => {
              console.log('ERROR: ', error)
          })
        }

        const handlePatientName = (e) =>{
        axios.get(`http://127.0.0.1:5000/api/v1/users/show_patient?ic_number=${e}`, 
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(result => {
            let user = result.data
            console.log(result.data)
            setUser(user)
          })
          .catch(error => {
            console.log('ERROR: ', error)
        })
      }

        const handleReportDisplay = (e) =>{
            console.log(e)
            axios.get(`http://127.0.0.1:5000/api/v1/records/search?record_id=${e}`, 
            {
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
            })
              .then(result => {
                let record = result.data
                console.log(result.data)
                setRecord(record)
                setDoctor(record.doctor_id)
                setSugarLevel(record.sugar_level)
                setCholesterolLevel(record.cholestrol_level)
                setDiaBloodPressure(record.diastolic_blood_pressure)
                setSysBloodPressure(record.systolic_blood_pressure)
              })
              .catch(error => {
                console.log('ERROR: ', error)
            })
          }
  
          

    return(
        <>
        <Row>
          <Col md="4">
        <div>
        <h3 style={{color:"#205072"}}>Your Patient</h3>
        <br/>
        { patientList
            ?   <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                {patientList.map((list,li) => {
                            return(
                                <>
                                    <li key={li}>
                                        <NavLink value={list.ic_number} onClick={() => {handleReportList(list.ic_number); handlePatientName(list.ic_number)}}>{list.name}</NavLink>
                                    </li>
                                </>
                            )
                        })}
                </ul>
            : null
        }
        </div>
        </Col>

        <Col md="8">
          <h5 style={{color:"#205072"}}>Record</h5>
          <br/>

        {
          report
          ? <> 
          <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
          {report.map((relist,reli) => {
              return(
                <li key={reli}>
                <NavLink onClick={() => {toggle(); handleReportDisplay(relist.record_id);}}>{relist.record_id}</NavLink>
                    <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
                    <PatientReport2 record={record} toggle={toggle} user={user}/>
                    </Modal> 
                </li>
                )
            })}
            </ul> 
            </>
            : <h5>no record</h5>
        }
        </Col>
        </Row> 
    </>  
    )
}

export default GuardianPatientRecord;