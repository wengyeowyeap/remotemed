import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PatientReport2 from "./PatientReport2"
import DoctorPatientRecord from './DoctorPatientRecord';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const DoctorReportModal = (props) => {
  const {
    record
  } = props;
  // console.log("#################################")
  // console.log(record.record_id)
  console.log(record.image_list[2])

  const [modal, setModal] = useState(false);
  let prescription=""
  let report=""
  
  const submitRecord=() => {
    toggle()

    axios({
      method:"POST",
      url:"http://127.0.0.1:5000/api/v1/records/update",
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("token")
      },
      data:{
        report:report,
        prescription:prescription,
        record_id:record.record_id,
        payment_amount:record.payment_amount
       
      }
    })
    .then(result=>{
      console.log(result)
    })
    

    
  }
  const getReportFromChildren=(r) => {
    report=r
    console.log(report)
    
  }
  const getPrescriptionFromChildren=(p) => {
    prescription=p
    console.log(prescription)
    
  }
  

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="mb-2" onClick={toggle}>{record.appointment_id} </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle} >
        <ModalBody>
            <DoctorPatientRecord record={record} getReportFromChildren={getReportFromChildren} getPrescriptionFromChildren={getPrescriptionFromChildren} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitRecord}>Submit Record</Button>{' '}
          <Button color="secondary" onClick={toggle }>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DoctorReportModal;